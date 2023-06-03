import { TokenPF2e } from "../token/index.ts";
/** A `PointSource` to track token hearing sense */
declare class HearingSource<TObject extends TokenPF2e> extends SoundSource<TObject> {
    protected _initialize(data: PointSourceData): void;
}
export { HearingSource };
