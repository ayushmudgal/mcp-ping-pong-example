import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create server instance
const server = new McpServer({
    name: "ping-pong",
    version: "1.0.0",
});

// Add echo handler
server.tool(
    "ping",
    "Responds with pong and echoes back the received data",
    {},
    async (params) => {
        console.error(`Received ping with params: ${JSON.stringify(params)}`);
        return {
            content: [
                {
                    type: "text",
                    text: "pong"
                }
            ]
        };
    }
);

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Echo MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});