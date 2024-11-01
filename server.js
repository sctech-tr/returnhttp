addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Get the path from the URL
  const url = new URL(request.url);
  const path = url.pathname.substring(1); // removes leading '/'

  // Try parsing the path as an integer to use as the status code
  const statusCode = parseInt(path);

  // Default message if a valid status code isn't provided
  let statusMessage = "NotImplementedException (contact author)"; // reference to c# :D

  // Check if the parsed path is a valid HTTP status code
  if (!isNaN(statusCode) && statusCode >= 100 && statusCode <= 599) {
    // Use a standard message if the code is recognized
    statusMessage = ${statusCode} - ${getStatusMessage(statusCode)};
  } else {
    // If the code is invalid, use 400 Bad Request by default
    return new Response("452 - Client Is Awful", { status: 452 }); // easter egg? maybe? i might have to remove this
  }

  return new Response(statusMessage, { status: statusCode });
}

// Status code map
function getStatusMessage(statusCode) {
  const messages = {
    // 1xx: Informational
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",
    103: "Early Hints",
    
    // 2xx: Success
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",
    208: "Already Reported",
    226: "IM Used",
    
    // 3xx: Redirection
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    307: "Temporary Redirect",
    308: "Permanent Redirect",
    
    // 4xx: Client Error
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    
    // 5xx: Server Error
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
  };
  return messages[statusCode] || "Custom Status Code";
}
