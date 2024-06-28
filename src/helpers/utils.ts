import { crypto } from "../helpers/path";
class Utils {
    constructor() { }

    createHashPwd = (pwd: string) => {        
        return crypto.createHash("md5").update(pwd).digest("hex");
    };
    
    returnPaginatinPageLimit = (query: any) => {
        let page: any = (query.page ?? 1);
        let limit: any = query.limit ?? 10;
        delete query.page;
        delete query.limit;
        return {
          page: parseInt(page),
          limit: parseInt(limit),
        };
      };
    
}

export default new Utils();