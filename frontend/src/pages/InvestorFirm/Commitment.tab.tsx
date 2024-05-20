import { Box, Flex, Select, Table } from '@mantine/core';
import { useMemo, useState } from 'react';
import { IAssetClass, IInvFirmCommitmentModified } from '@/types';
import { assetTypes } from '@/utils';
import classes from './InvestorFirm.module.css';

interface IProps {
  data: Record<IAssetClass, IInvFirmCommitmentModified[]>;
  currency: 'USD' | 'EUR';
}

const options = (Object.keys(assetTypes) as IAssetClass[]).map((key) => ({
  value: key,
  label: assetTypes[key],
}));

export function CommitmentTab({ data, currency }: IProps) {
  const [type, setType] = useState<IAssetClass>('hf');
  const displayData = useMemo(() => data[type], [type]);

  return (
    <Flex h="100%" direction="column" gap="15" pt="15">
      <Box className={classes.assetTypeSelect}>
        <Select
          value={type}
          data={options}
          onChange={(value) => value && setType(value as IAssetClass)}
        />
      </Box>
      <Table.ScrollContainer h="100%" minWidth="100%">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Id</Table.Th>
              <Table.Th>Asset Class</Table.Th>
              <Table.Th>Amount</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {displayData.map((ele: IInvFirmCommitmentModified) => (
              <Table.Tr key={ele.id}>
                <Table.Td>{ele.id}</Table.Td>
                <Table.Td>{assetTypes[ele.asset_class]}</Table.Td>
                <Table.Td>{ele.derivedAmount[currency]}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Flex>
  );
}
