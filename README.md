# Creating a Simple MCP Ping-Pong Server

This guide will walk you through creating a basic Model Context Protocol (MCP) server that implements a simple ping-pong functionality. This is a great starting point for understanding how to build MCP integrations.

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)
- Git (for version control)

## Step 1: Project Setup

1. Create a new directory for your project:
```bash
mkdir mcp-server-demo
cd mcp-server-demo
```

2. Initialize a new npm project:
```bash
npm init -y
```

3. Install the required dependency:
```bash
npm install @modelcontextprotocol/sdk
```

## Step 1.1: Connect to Remote Repository

1. Initialize a new Git repository:
```bash
git init
```

2. Create a .gitignore file:
```bash
echo "node_modules/" > .gitignore
```

3. Add and commit your files:
```bash
git add .
git commit -m "Initial commit: MCP ping-pong server setup"
```

4. Connect to your remote repository (replace YOUR_REPOSITORY_URL with your actual repository URL):
```bash
git remote add origin YOUR_REPOSITORY_URL
git branch -M main
git push -u origin main
```

Note: If you're using GitHub, you can create a new repository at https://github.com/new

## Step 2: Configure Package.json

Update your `package.json` to include the following configurations:

```json
{
  "name": "mcp-server-demo",
  "version": "1.0.0",
  "description": "MCP Server for Cursor",
  "main": "mcp_server.js",
  "type": "module",
  "scripts": {
    "start": "node mcp_server.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.4.0"
  }
}
```

Note: The `"type": "module"` field is crucial as it enables ES Module syntax.

## Step 3: Create the Server

Create a new file called `mcp_server.js` with the following content:

```javascript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create server instance
const server = new McpServer({
    name: "ping-pong",
    version: "1.0.0",
});

// Add ping handler
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
```

## Understanding the Code

1. **Imports**: 
   - `McpServer`: The main class for creating an MCP server
   - `StdioServerTransport`: Handles communication via standard input/output

2. **Server Setup**:
   - Creates a new MCP server instance with a name and version
   - Configures a simple tool named "ping"

3. **Tool Implementation**:
   - The ping tool accepts any parameters
   - Logs received parameters to stderr
   - Returns a simple "pong" response

4. **Server Start**:
   - Uses StdioServerTransport for communication
   - Handles errors and logs startup status

## Running the Server

1. Start the server:
```bash
npm start
```

2. The server will run and wait for input through stdio. It's designed to be used with MCP clients like Cursor.

## Testing

When integrated with an MCP client, you can test the server by:
1. Sending a ping request
2. Checking the response, which should be "pong"
3. Observing the logged parameters in stderr

## Common Issues

1. **Import Errors**: Make sure `"type": "module"` is set in package.json
2. **Version Mismatch**: Ensure Node.js version is 18 or higher
3. **Permission Issues**: If needed, make the script executable:
   ```bash
   chmod +x mcp_server.js
   ```

## Next Steps

- Add more complex tools with specific parameter schemas
- Implement different response types
- Add error handling for invalid inputs
- Explore other transport methods besides stdio

## Resources

- [MCP SDK Documentation](https://modelcontextprotocol.io)
- [MCP Protocol Specification](https://github.com/modelcontextprotocol/specification) 