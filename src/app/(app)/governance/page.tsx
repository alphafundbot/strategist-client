
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, ThumbsUp, ThumbsDown, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const proposals = [
  {
    id: 'prop-001',
    title: 'Ratify Universal Data Dividend Act',
    agent: 'Ethics Council Agent',
    rationale: 'Establishes a framework for citizens to receive micro-dividends from the commercial use of their aggregated, anonymized data, promoting equitable wealth distribution from the data economy.',
    status: 'passing',
    ayes: 12834,
    nays: 4122,
  },
  {
    id: 'prop-002',
    title: 'Deploy Compliance Shepherd Agent for Carbon Credits',
    agent: 'Incentive Designer Agent',
    rationale: 'Automates the monitoring and issuance of carbon credits for verified eco-friendly actions, using IoT data to ensure compliance and reduce administrative overhead.',
    status: 'debate',
    ayes: 8901,
    nays: 7543,
  },
  {
    id: 'prop-003',
    title: 'Standardize Digital Citizen Identity Protocol',
    agent: 'Consensus Broker Agent',
    rationale: 'Creates a unified, cross-jurisdictional digital identity standard, linking real-world credentials with on-chain reputation, enabling seamless and secure participation in the governance fabric.',
    status: 'failed',
    ayes: 6034,
    nays: 11059,
  }
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'passing':
      return 'default';
    case 'debate':
      return 'secondary';
    case 'failed':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function GovernancePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold">Governance Fabric</h1>
                <p className="text-muted-foreground">Active proposals, voting tallies, and agent-authored rationales shaping the new social contract.</p>
            </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {proposals.map((proposal, index) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{proposal.title}</CardTitle>
                  <Badge variant={getStatusBadgeVariant(proposal.status)} className="capitalize">{proposal.status}</Badge>
                </div>
                <CardDescription className="flex items-center gap-2 pt-1">
                  <Bot className="h-4 w-4" /> Authored by {proposal.agent}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{proposal.rationale}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-green-500">
                    <ThumbsUp className="h-4 w-4" /> {proposal.ayes.toLocaleString()} Ayes
                  </span>
                  <span className="flex items-center gap-1.5 text-red-500">
                    <ThumbsDown className="h-4 w-4" /> {proposal.nays.toLocaleString()} Nays
                  </span>
                </div>
                <div className="flex items-center gap-2">
                   <Button variant="outline" size="sm">
                     <Scale className="mr-2 h-4 w-4"/>
                     View Ledger
                   </Button>
                   <Button size="sm">Vote</Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
