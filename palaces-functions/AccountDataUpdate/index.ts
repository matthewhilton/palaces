import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos"

const client = new CosmosClient(process.env.COSMOS_DB);

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    // Required body params
    if(!req.body.password || !req.body.id) {
        context.res = {
            statusCode: 500,
            body: {
                error: "Password and ID body param required"
            }
        }
        return
    }

    // Database connection
    context.log('Connecting to database and container');
    const { database } = await client.databases.createIfNotExists({ id: "palaces-app"})
    const { container } = await database.containers.createIfNotExists({ id: "palaces"})

    // See if account actually exists
    const { resource: existingItem} = await container.item(req.body.id, req.body.id).read();

    // Not found
    if(!existingItem) {
        context.res = {
            statusCode: 400,
            body: {
                error: "Could not find item"
            }
        }
        return
    }

    // Check password
    if(existingItem.password !== req.body.password) {
        context.res = {
            statusCode: 401,
            body: {
                error: "Incorrect password"
            }
        }
        return
    }

    const itemUpdate = {
        ...existingItem,
        id: req.body.id,
        places: req.body.places,
        checkpoint: req.body.checkpoint || null,
    }

    await container.items.upsert(itemUpdate)
};

export default httpTrigger;