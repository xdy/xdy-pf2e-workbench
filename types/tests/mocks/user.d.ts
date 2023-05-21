import { UserSourcePF2e } from "@module/user/data.js";
export declare class MockUser {
    readonly _source: UserSourcePF2e;
    constructor(data: UserSourcePF2e);
    get name(): string;
    update(changes: Record<string, unknown>): Promise<this>;
}
