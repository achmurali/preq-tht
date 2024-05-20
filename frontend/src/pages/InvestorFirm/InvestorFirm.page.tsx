import { Box, Flex, Pill, Select, Stack, Title, useMantineTheme, Tabs, Paper } from '@mantine/core';
import { useState } from 'react';
import { Await, useLoaderData, useParams } from 'react-router-dom';
import { useRootStore } from '@/store';
import { investorFirmTypeColorMap } from '@/utils';
import classes from './InvestorFirm.module.css';
import { SummaryTab } from './Summary.tab';
import { CommitmentTab } from './Commitment.tab';

const currencyMultiples = {
  EUR: 0.9,
  USD: 1.1,
};

const currencies = ['USD', 'EUR'];

export function InvestorFirmPage() {
  const { firmId } = useParams();
  const theme = useMantineTheme();
  const { data } = useLoaderData() as { data: any };

  const commitment = useRootStore((state) => state.commitment);
  const investors = useRootStore((state) => state.investors);
  const selectedInvestor = investors?.find((inv) => inv.firm_id.toString() === firmId);
  const [currency, setCurrency] = useState<keyof typeof currencyMultiples>('USD');

  const handleCurrencyChange = (value: string | null) => {
    value && setCurrency(value as keyof typeof currencyMultiples);
  };

  if (!selectedInvestor || !firmId) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw new Response(null, { status: 500 });
  }

  return (
    <Await resolve={data}>
      <Flex
        className={classes.rootContainer}
        h="100vh"
        direction="column"
        w="100%"
        align="flex-start"
        justify="flex-start"
      >
        <Stack gap={10} pb={10}>
          <Flex direction="row" align="center" gap="10">
            <Title>{selectedInvestor.firm_name}</Title>
            <Pill
              variant="contrast"
              bg={theme.colors[investorFirmTypeColorMap[selectedInvestor.firm_type]][3]}
              classNames={{ root: classes.firmTypePill }}
            >
              {selectedInvestor.firm_type}
            </Pill>
            <Box w="100">
              <Select data={currencies} value={currency} onChange={handleCurrencyChange} />
            </Box>
          </Flex>
        </Stack>
        {/* <Select data={assetTypes} onChange={handleOnChange} value={type} /> */}
        <Paper bg="gray.8" radius="md" p="md" display="flex" w="100%" h="100%">
          <Tabs defaultValue="summary" w="100%" variant="pills" color="rgba(0, 139, 252, 1)">
            <Tabs.List>
              <Tabs.Tab value="summary">Summary</Tabs.Tab>
              <Tabs.Tab value="commitments">Commitments</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="summary" h="100%">
              <SummaryTab data={commitment[firmId] as any} currency={currency} />
            </Tabs.Panel>
            <Tabs.Panel value="commitments" h="100%">
              <CommitmentTab data={commitment[firmId] as any} currency={currency} />
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Flex>
    </Await>
  );
}
