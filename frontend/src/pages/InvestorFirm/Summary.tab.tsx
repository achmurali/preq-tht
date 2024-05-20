import { PieChart } from '@mantine/charts';
import { Flex } from '@mantine/core';
import { useMemo } from 'react';
import { IAssetClass, IInvFirmCommitmentModified } from '@/types';
import { assetClassPieChartColorMap, assetTypes } from '@/utils';

interface IProps {
  data: Record<IAssetClass, IInvFirmCommitmentModified[]>;
  currency: 'USD' | 'EUR';
}

export function SummaryTab({ data, currency }: IProps) {
  const pieChartData = useMemo(
    () =>
      (Object.keys(data) as IAssetClass[]).reduce(
        (acc, type) => {
          let usd = 0;
          let eur = 0;

          data[type].forEach((ele) => {
            usd += ele.derivedAmount.USD;
            eur += ele.derivedAmount.EUR;
          });

          acc.usd.push({
            name: assetTypes[type],
            value: usd,
            color: assetClassPieChartColorMap[type],
          });
          acc.eur.push({
            name: assetTypes[type],
            value: eur,
            color: assetClassPieChartColorMap[type],
          });

          return acc;
        },
        { usd: [], eur: [] } as any
      ),
    []
  );

  return (
    <Flex align="center" justify="center" h="100%" flex={1}>
      <PieChart
        withLabelsLine
        labelsPosition="outside"
        labelsType="value"
        withLabels
        withTooltip
        data={pieChartData[currency.toLowerCase()]}
        size={600}
      />
    </Flex>
  );
}
