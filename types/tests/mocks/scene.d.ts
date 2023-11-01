export declare class MockScene {
    _source: foundry.documents.SceneSource;
    constructor(data: Partial<foundry.documents.SceneSource>);
    get id(): string | null;
    get name(): string;
    addToken(token: Partial<foundry.documents.TokenSource>): void;
    update(changes: object): void;
    updateEmbeddedEntity(entityType: string, changes: {
        _id: string;
    }): void;
}
