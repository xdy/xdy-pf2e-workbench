function getOwners(actor: Actor) {
    return game.users?.contents.filter(
        (u) =>
            actor.data?.document?.getUserLevel(u) ||
            CONST.DOCUMENT_PERMISSION_LEVELS.NONE >= CONST.DOCUMENT_PERMISSION_LEVELS.OWNER
    );
}

export function isFirstOwner(actor: Actor) {
    const owners = getOwners(actor) || [];
    return actor.isOwner && (owners.length === 1 || (owners.length > 1 && owners[0].id === game.user?.id));
}
