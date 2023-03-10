import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    id: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
  }
}
