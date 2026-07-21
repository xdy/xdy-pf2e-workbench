export enum Phase {
    DOWN = 0, // Before init, not sure if it has a name in foundry
    INIT = 10,
    SETUP = 20,
    READY = 30,
    ACTIVE = 40, // After ready, not sure if it has a name in foundry
}

export let phase: Phase = Phase.DOWN;

export function setPhase(value: Phase): void {
    phase = value;
}
