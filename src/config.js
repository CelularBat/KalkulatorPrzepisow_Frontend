
const DEV_API_ROOT = "http://localhost:3000";
const DEPLOY_API_ROOT = "https://kalkulatorprzepisow-backend.onrender.com"; 


/* Settings: Logging levels for Logger.js:
    - DEBUG
    - INFO
    - WARN
    - ERROR
Set the desired logging level here: */

const LOGGING_LEVEL = "DEBUG";






/* Don't touch below*/

// This global variable is set in npm scripts in package.json
import IS_DEPLOYMENT from "./__autoconfig/__autoconfig_vars"

const API_ROOT = IS_DEPLOYMENT ? DEPLOY_API_ROOT : DEV_API_ROOT;

export {
    API_ROOT,
    LOGGING_LEVEL
}