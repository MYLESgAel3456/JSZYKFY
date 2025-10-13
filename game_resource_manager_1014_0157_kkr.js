// 代码生成时间: 2025-10-14 01:57:24
// Utility function to load resources asynchronously
function loadResource(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(new Error(`Failed to load resource from ${url}`));
            }
        };
        xhr.onerror = () => {
            reject(new Error(`Error loading resource from ${url}`));
        };
        xhr.send();
    });
}

// Class to manage game resources
class GameResourceManager {
    constructor() {
        // Hold resources in memory after they are loaded
        this.resources = {};
    }

    /**
     * Load a single resource
     * @param {string} name - The name of the resource
     * @param {string} url - The URL where the resource can be fetched
     * @returns {Promise} - A promise that resolves with the resource or rejects with an error
     */
    load(name, url) {
        return loadResource(url)
            .then(blob => {
                // Convert blob to URL if necessary
                const resourceUrl = URL.createObjectURL(blob);
                this.resources[name] = resourceUrl;
                return resourceUrl;
            })
            .catch(error => {
                throw error; // Propagate the error to the caller
            });
    }

    /**
     * Load multiple resources
     * @param {Array} resources - An array of objects containing resource names and URLs
     * @returns {Promise<Array>} - A promise that resolves with an array of loaded resources or rejects with an error
     */
    async loadMultiple(resources) {
        try {
            const loadedResources = await Promise.all(resources.map(resource =>
                this.load(resource.name, resource.url)
            ));
            return loadedResources;
        } catch (error) {
            throw error; // Propagate the error to the caller
        }
    }

    /**
     * Get a resource by name
     * @param {string} name - The name of the resource to retrieve
     * @returns {string|null} - The URL of the resource or null if not found
     */
    get(name) {
        return this.resources[name] || null;
    }
}

// Example usage
const resourceManager = new GameResourceManager();
const resourcesToLoad = [
    { name: 'background', url: 'path/to/background.png' },
    { name: 'sound', url: 'path/to/sound.mp3' }
];

resourceManager.loadMultiple(resourcesToLoad)
    .then(loadedResources => {
        console.log('Resources loaded:', loadedResources);
    })
    .catch(error => {
        console.error('Error loading resources:', error);
    });
