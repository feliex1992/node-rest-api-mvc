class ControllerBase {
  public params: any;
  public query: any;
  public headers: any;
  public body: any;
  public send: any;
  public repository: any;

  constructor({ 
    params, 
    query, 
    headers, 
    body, 
    send, 
    repository 
  }: any) {
    this.params = params;
    this.query = query;
    this.headers = headers;
    this.body = body;
    this.send = send;
    this.repository = repository;
  }

  error(err: any) {
    const status = err.statusCode || err.status;
    const statusCode = status || 500;
    
    const message = err.message || err
    
    this.send(statusCode, message);
  }

  success(data: any) {
    this.send(200, data);
  }
}

export default ControllerBase;
