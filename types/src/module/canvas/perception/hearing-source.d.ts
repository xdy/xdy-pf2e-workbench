import { TokenPF2e } from "../token";
/** A `PointSource` to track token hearing sense */
declare class HearingSource<TObject extends TokenPF2e> extends PointSource<TObject> {
    static sourceType: string;
    initialize(): this;
    protected _getPolygonConfiguration(): PointSourcePolygonConfig;
}
interface HearingSource<TObject extends TokenPF2e> extends PointSource<TObject> {
    data: Required<SoundSourceData>;
}
export { HearingSource };
