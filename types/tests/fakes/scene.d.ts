export declare class FakeScene {
    data: Partial<foundry.data.SceneData> & {
        _id: string;
        name: string;
    };
    constructor(data: Partial<foundry.data.SceneSource>);
    get id(): string;
    get name(): string;
    addToken(token: Partial<foundry.data.TokenData>): void;
    update(changes: object): void;
    updateEmbeddedEntity(entityType: string, changes: any): void;
}
