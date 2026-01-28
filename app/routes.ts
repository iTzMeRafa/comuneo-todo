import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [
    index("./pages/home/welcome.tsx"),
    route("test", "./pages/test/test.tsx"),
] satisfies RouteConfig;