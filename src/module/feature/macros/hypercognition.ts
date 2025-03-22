// Basic support for the Hypercognition and Incredible Recollection feats as well as the Hypercognition spell.
// This macro runs Recall Knowledge multiple times and analyzes the results

import { TokenPF2e } from "foundry-pf2e";

export async function hypercognition(token: TokenPF2e) {
    // Verify we have a target and get the actor
    if (game.user.targets.size !== 1) {
        ui.notifications.error("Please select exactly one target");
        return;
    }

    const actor = token?.actor;
    if (!actor) {
        ui.notifications.error("No actor found");
        return;
    }

    const hasHypercognition = actor.itemTypes.spell.find((spell) => ["hypercognition"].includes(<string>spell.slug));
    const hasTrueHypercognition = actor.itemTypes.feat.find((feat) =>
        ["true-hypercognition"].includes(<string>feat.slug),
    );
    const hasIncredibleRecollection = actor.itemTypes.feat.find((feat) =>
        ["incredible-recollection"].includes(<string>feat.slug),
    );
    if (!hasHypercognition && !hasTrueHypercognition && !hasIncredibleRecollection) {
        ui.notifications.error(
            "Selected actor has neither Hypercognition, Incredible Recollection nor True Hypercognition!",
        );
        return;
    }

    const results = {
        criticalSuccess: { count: 0, rolls: [] },
        success: { count: 0, rolls: [] },
        failure: { count: 0, rolls: [] },
        criticalFailure: { count: 0, rolls: [] },
    };

    // Find the Recall Knowledge macro
    const recallKnowledgeMacro = game.macros.find((m) => m.name === "Recall_Knowledge");
    if (!recallKnowledgeMacro) {
        ui.notifications.error("Could not find the Recall_Knowledge macro");
        return;
    }

    // Get skill information before running the checks
    const SKILL_OPTIONS = ["arcana", "crafting", "medicine", "nature", "occultism", "religion", "society"];
    const skillInfo = SKILL_OPTIONS.map((skillId) => {
        const skill = actor.skills?.[skillId];
        return {
            name: skill?.label,
            rank: skill?.rank,
            modifier: skill?.["totalModifier"],
            wasUsed: false,
            actualModifier: 0,
        };
    });

    // Get lore skill information
    // @ts-ignore
    const loreInfo: any = Object.values(actor.skills)
        .filter((s: any) => s.lore)
        .map((skill: any) => ({
            name: skill.label,
            rank: skill.rank,
            modifier: skill.totalModifier,
            wasUsed: false,
            actualModifier: null,
        }));

    // Run Recall Knowledge several times
    const numberOfUses = hasHypercognition ? 6 : 5;
    for (let i = 0; i < numberOfUses; i++) {
        // Run the Recall Knowledge macro
        await recallKnowledgeMacro.execute();

        // Wait for the new message to appear
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Get the latest message
        const messages = game.messages?.contents;
        if (!messages?.length) continue;

        const latestMessage = messages[messages.length - 1];
        if (!latestMessage?.content) continue;

        // Create a temporary div to parse the HTML content
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = latestMessage.content;

        // Find all tables
        const tables = tempDiv.querySelectorAll("table");
        if (tables.length === 0) continue;

        // Get the d20 roll from the header once for this message
        const rollMatch = tempDiv.innerHTML.match(/Roll: <span[^>]*>(\d+)<\/span>/);
        const d20Roll = rollMatch ? parseInt(rollMatch[1]) : null;

        // Process primary skills (first table)
        const primaryTable = tables[0];
        const primaryRows = primaryTable.querySelectorAll("tr");

        // Track the best result for this roll
        let bestResult;

        primaryRows.forEach((row) => {
            const cells = row.querySelectorAll("td, th");
            if (cells.length >= 3) {
                const skillName = cells[0].textContent?.trim();

                // For primary skills, look for the roll result (which includes the modifier)
                const rollResult = cells[2]?.querySelector("span")?.textContent;
                const rollNumber = rollResult ? parseInt(rollResult) : null;

                // Calculate modifier if we have both numbers
                const calculatedMod = rollNumber !== null && d20Roll !== null ? rollNumber - d20Roll : null;

                // Update skillInfo if this is a primary skill
                const primarySkill = skillInfo.find((s) => s.name === skillName);
                if (primarySkill) {
                    primarySkill.wasUsed = true;
                    if (calculatedMod !== null) {
                        primarySkill.actualModifier = calculatedMod;
                    }
                }

                // Check for degree of success in this row
                const rowText = row.textContent;
                const successMatch = rowText?.match(/(CrSuc|Suc|Fail|CrFail)/);
                if (successMatch) {
                    const result = successMatch[1];
                    // Update bestResult if this is better than current best
                    if (
                        !bestResult ||
                        result === "CrSuc" ||
                        (result === "Suc" && bestResult !== "CrSuc") ||
                        (result === "Fail" && bestResult === "CrFail")
                    ) {
                        bestResult = result;
                    }
                }
            }
        });

        // Process lore skills (last table)
        const loreTable = tables[tables.length - 2]; // Second to last table (last one is potential modifiers)
        if (loreTable) {
            const loreRows = loreTable.querySelectorAll("tr");
            loreRows.forEach((row) => {
                const cells = row.querySelectorAll("td, th");
                if (cells.length >= 3) {
                    const skillName = cells[0].textContent?.trim();
                    // For lore skills, the modifier is explicitly shown in the Mod column
                    const modText = cells[2]?.textContent?.trim();
                    const modMatch = modText?.match(/[+-]\d+/);

                    // Update loreInfo if this is a lore skill
                    const loreSkill = loreInfo.find((s) => s.name === skillName);
                    if (loreSkill && modMatch) {
                        loreSkill.wasUsed = true;
                        loreSkill.actualModifier = parseInt(modMatch[0]);
                    }
                }
            });
        }

        // Count only the best result for this roll and store the d20 value
        if (bestResult && d20Roll !== null) {
            switch (bestResult) {
                case "CrSuc":
                    // eslint-disable-next-line no-plusplus
                    results.criticalSuccess.count++;
                    // @ts-ignore
                    results.criticalSuccess.rolls.push(d20Roll);
                    break;
                case "Suc":
                    results.success.count++;
                    // @ts-ignore
                    results.success.rolls.push(d20Roll);
                    break;
                case "Fail":
                    results.failure.count++;
                    // @ts-ignore
                    results.failure.rolls.push(d20Roll);
                    break;
                case "CrFail":
                    results.criticalFailure.count++;
                    // @ts-ignore
                    results.criticalFailure.rolls.push(d20Roll);
                    break;
            }
        }

        // Delete the message
        try {
            await latestMessage.delete();
        } catch (error) {
            console.warn("Could not delete message:", error);
        }
    }

    // Create a summary message with skill information
    const RANK_NAMES = ["UNTRAINED", "TRAINED", "EXPERT", "MASTER", "LEGENDARY"];
    const RANK_COLORS = ["#443730", "#171f69", "#3c005e", "#5e4000", "#5e0000"];
    const DOS_COLORS = ["red", "orange", "royalblue", "green"];

    const formatResultLine = (category, result, colorIndex) => {
        if (result.count === 0) return `${category}: 0`;
        return `<span style="color:${DOS_COLORS[colorIndex]}">${category}: ${result.count} (Rolls: ${result.rolls.join(", ")})</span>`;
    };

    let summary = `<italic>${token.name}</italic> ponders the true nature of <strong>${game.user.targets?.first()?.name}</strong> (${numberOfUses} Recall Knowledge rolls)<br>
<div data-visibility="gm" style="display: block">
        ${formatResultLine("Critical Successes", results.criticalSuccess, 3)}<br>
        ${formatResultLine("Successes", results.success, 2)}<br>
        ${formatResultLine("Failures", results.failure, 1)}<br>
        ${formatResultLine("Critical Failures", results.criticalFailure, 0)}<br><br>`;

    // Get used primary skills
    const usedPrimarySkills = skillInfo.filter((skill) => skill.wasUsed);
    if (usedPrimarySkills.length > 0) {
        summary += "<strong>Used Skills:</strong><br>";
        summary +=
            '<table style="border-collapse: collapse; width: 100%;"><tr><th>Skill</th><th>Proficiency</th><th>Modifier</th></tr>';
        for (const skill of usedPrimarySkills) {
            const modifier = skill.actualModifier !== null ? skill.actualModifier : skill.modifier;
            // @ts-ignore
            summary += `<tr><td>${skill.name}</td><td class="tags"><div class="tag" style="background-color: ${RANK_COLORS[skill.rank]}; white-space:nowrap">${RANK_NAMES[skill.rank]}</div></td><td>${modifier !== null ? (modifier >= 0 ? "+" : "") + modifier : ""}</td></tr>`;
        }
        summary += "</table><br>";
    }

    // Get used lore skills
    const usedLoreSkills = loreInfo.filter((lore) => lore.wasUsed);
    if (usedLoreSkills.length > 0) {
        summary += "<strong>Used Lore Skills:</strong><br>";
        summary +=
            '<table style="border-collapse: collapse; width: 100%;"><tr><th>Lore</th><th>Proficiency</th><th>Modifier</th></tr>';
        for (const lore of usedLoreSkills) {
            const modifier = lore.actualModifier !== null ? lore.actualModifier : lore.modifier;
            summary += `<tr><td>${lore.name}</td><td class="tags"><div class="tag" style="background-color: ${RANK_COLORS[lore.rank]}; white-space:nowrap">${RANK_NAMES[lore.rank]}</div></td><td>${modifier !== null ? (modifier >= 0 ? "+" : "") + modifier : ""}</td></tr>`;
        }
        summary += "</table></div>";
    }

    await ChatMessage.create({
        content: summary,
    });
}

// Run the analysis
// hypercognition(token);
