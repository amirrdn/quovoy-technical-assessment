import { Router } from 'express';
import { LeadController } from '../controllers/LeadController.js';

const router = Router();
const leadController = new LeadController();

router.get('/', (req, res) => leadController.getLeads(req, res));
router.post('/', (req, res) => leadController.createLead(req, res));

export default router;
