import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos"

const client = new CosmosClient(process.env.COSMOS_DB);

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    // Required body params
    if(!req.body.password || !req.body.name) {
        context.res = {
            statusCode: 500,
            body: {
                error: "Password and Name body param required"
            }
        }
        return
    }

    // Database connection
    context.log('Connecting to database and container');
    const { database } = await client.databases.createIfNotExists({ id: "palaces-app"})
    const { container } = await database.containers.createIfNotExists({ id: "palaces"})

    context.log('Creating new account');
    const newItem = {
        password: req.body.password,
        name: req.body.name,
        places: []
    }

    const { resource: createdItem } = await container.items.create(newItem)

    context.res = {
        body: {
            id: createdItem.id
        }
    }
    return
};

export default httpTrigger;