import { name, version, description } from '../../package.json';

const getConfiguration = () => ({
    app: {
        name,
        version,
        description,
        port: process.env.APP_PORT,
        prefix: process.env.APP_PREFIX,
        server: `http://localhost:${process.env.APP_PORT}${process.env.APP_PREFIX}`,
    },
    mongodb: {
        uri: process.env.MONGODB_URI,
        name: process.env.MONGODB_NAME,
    },
});

export default getConfiguration;
export type Configuration = ReturnType<typeof getConfiguration>;
