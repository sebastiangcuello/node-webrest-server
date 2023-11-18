import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path: string;
}

export class Server {

    private app = express();
    private readonly port:number;
    private readonly routes:Router;
    private readonly publicPath:string;

    constructor( options:Options ){
        const { port, routes, public_path } = options;
        this.port = port;
        this.routes = routes;
        this.publicPath = public_path;
    }

    async start(){

        // Middlewares
        // Este middleware permite parsear el body de tipo json
        this.app.use( express.json() ); 
        // Este middleware permite parsear el body de tipo x-www-form-urlencoded
        this.app.use( express.urlencoded({ extended: true }) ); 

        // Public Folders (Un tipo de middleware)
        this.app.use(express.static( this.publicPath ));

        //Routes
        this.app.use( this.routes );

        // SPA
        this.app.get('*', ( req, res ) => {
            const indexPath = path.join( __dirname + `../../../${this.publicPath}/index.html` );
            res.sendFile(indexPath);

        });

        this.app.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });

    }
}