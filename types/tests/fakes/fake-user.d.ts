interface FakeUserData {
    name: string;
    _id: string;
    flags: {
        PF2e?: {
            settings?: {
                quickD20roll?: boolean;
            };
        };
    };
}
export declare class FakeUser {
    _data: FakeUserData;
    constructor(data: FakeUserData);
    get data(): FakeUserData;
    get name(): string;
    update(changes: Record<string, unknown>): Promise<this>;
}
export {};
