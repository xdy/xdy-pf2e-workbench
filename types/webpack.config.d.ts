import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration, Request } from "webpack-dev-server";

interface Configuration extends Omit<WebpackConfiguration, "devServer"> {
    devServer?: Omit<WebpackDevServerConfiguration, "proxy"> & {
        proxy?: {
            context: (pathname: string, _request: Request) => boolean;
            target: string;
            ws: boolean | undefined;
        };
    };
}
declare const config: Configuration;
export default config;
