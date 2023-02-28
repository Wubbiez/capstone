import {rebuildDB} from "./seedData.js";
import client from "./client.js";

rebuildDB()
    .catch(console.error)
    .finally(() => client.end());