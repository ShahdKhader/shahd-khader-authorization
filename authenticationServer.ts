import express from 'express'
import db from './models';
const app = express();
app.use(express.json());
require('dotenv').config();
import * as jwt from 'jsonwebtoken';
import { customerLoginHandler, authenticateToken} from './controler';
const port = process.env.PORT|| 4000;

app.post('/customer/login', customerLoginHandler);

app.get('/customer',authenticateToken,async(req, res)=>{
  res.json( await db.customer.findByPk(req.body.id))
})

function generateAccessToken(customer: any){
  return jwt.sign(customer, process.env.ACCESS_TOKEN_SECRET as string,
  {expiresIn: '20s'})
}
app.post('/customer/Authenticate', async (req: any, res: any) => {
  try {
      const customerOp =  {
          id: req.body.id,
          name: req.body.name,
          registrationDate: req.body.registrationDate,
          pass: req.body.pass
          }
      const accessToken = generateAccessToken(customerOp);
      const refrechToken = jwt.sign(customerOp, process.env.REFRESH_TOKEN_SECRET as string,
      )
       res.json({accessToken: accessToken, refrechToken});
  } catch (error) {
    console.error('Error while Authenticate Customer', error);
    res.status(500).json({ error: 'An error occurred while Authenticate Customer.' });
  }
});
let refrechTokens: any= [];
app.post('/token',async(req: any, res:any)=>{
  try{
    const refrechToken = req.body.token;
    if(refrechToken == null) return res.sendStatus(401);
    if(!refrechTokens.includes(refrechToken)) return res.sendStatus(403);
    jwt.verify(refrechToken, process.env.REFRESH_TOKEN_SECRET as string,
    (error: any,customer: any)=>{
      if(error) return res.sendStatus(403);
      const accessToken = generateAccessToken(customer.id)
      res.json({accessToken: accessToken})
    })
  }catch(error){
    console.error('Error in token', error);
    res.status(500).json({ error: 'An error occurred in token.' });
  }
})

app.delete('/logout',async (req:any, res: any) => {
  refrechTokens = refrechTokens.filter((token: any) => token !== req.body.token);
  res.sendStatus(204);
})
db.sequelize.sync().then(()=>{
    app.listen(port, () => {
      console.log(`app is running on port ${port}`);
    });
  });
