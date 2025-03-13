export class HttpError extends Error {
    response
    
    constructor(response) {
      super(`HTTP error ${response.status}`);
      this.response = response
    }
}