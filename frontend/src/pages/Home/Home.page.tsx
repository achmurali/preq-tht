import {
  ActionIcon,
  Anchor,
  Box,
  Code,
  Divider,
  Flex,
  HoverCard,
  LoadingOverlay,
  NumberFormatter,
  Pill,
  Stack,
  Table,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRootStore } from '@/store';
import classes from './Home.module.css';
import { investorFirmTypeColorMap } from '@/utils';

export function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { investors, setInvestors } = useRootStore();
  const [errorMessage, setErrorMessage] = useState<string>();
  const theme = useMantineTheme();

  useEffect(() => {
    const getInvestors = async () => {
      const result = await setInvestors();

      if (!result.success) {
        setErrorMessage('Failed to load the results, please try again');
      }

      setTimeout(() => {
        setErrorMessage(undefined);
        setIsLoading(false);
      }, 2000);
    };

    setIsLoading(true);
    getInvestors();
  }, []);

  const investorList = useMemo(
    () =>
      investors?.map((inv) => (
        <Table.Tr key={inv.firm_id}>
          <Table.Td>
            <Anchor>
              <Link to={`/investors/${inv.firm_id}`}>{inv.firm_id}</Link>
            </Anchor>
          </Table.Td>
          <Table.Td>{inv.firm_name}</Table.Td>
          <Table.Td>
            <Pill
              variant="contrast"
              bg={theme.colors[investorFirmTypeColorMap[inv.firm_type]][3]}
              classNames={{ root: classes.firmTypePill }}
            >
              {inv.firm_type}
            </Pill>
          </Table.Td>
          <Table.Td>{new Date(inv.date_added).toDateString()}</Table.Td>
          <Table.Td>{inv.city}</Table.Td>
          <Table.Td>
            <HoverCard position="right">
              <HoverCard.Target>
                <ActionIcon variant="light" radius="xl">
                  <IconInfoCircle />
                </ActionIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Stack w="300px">
                  <Flex className={classes.hoverContainer}>
                    <Text size="lg" lineClamp={1} truncate="end" display="block" fw={500}>
                      {inv.firm_name.repeat(100)}
                    </Text>
                    <Divider />
                    <Box>
                      <Code>AUM:</Code>{' '}
                      <NumberFormatter prefix="$" value={inv.AUM} thousandSeparator />
                    </Box>
                    <Text>
                      <Code>Address</Code>: {inv.address}
                    </Text>
                    <Text>
                      <Code>Country</Code>: {inv.country}
                    </Text>
                    <Text>
                      <Code>Last Updated</Code>: {new Date(inv.last_updated).toDateString()}
                    </Text>
                  </Flex>
                </Stack>
              </HoverCard.Dropdown>
            </HoverCard>
          </Table.Td>
        </Table.Tr>
      )),
    [investors]
  );

  return (
    <Flex
      classNames={{
        root: classes.rootContainer,
      }}
    >
      <Box>
        <Table
          verticalSpacing="lg"
          withTableBorder
          classNames={{
            tbody: classes.tableBody,
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th className={classes.tableCell}>Id</Table.Th>
              <Table.Th className={classes.tableCell}>Name</Table.Th>
              <Table.Th className={classes.tableCell}>Type</Table.Th>
              <Table.Th className={classes.tableCell}>Date Added</Table.Th>
              <Table.Th className={classes.tableCell}>City</Table.Th>
              <Table.Th className={classes.tableInfoCell}></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isLoading ? (
              <LoadingOverlay visible={isLoading} />
            ) : errorMessage ? (
              <Box className={classes.errorContainer}>
                <Text>{errorMessage}</Text>
              </Box>
            ) : (
              investorList
            )}
          </Table.Tbody>
        </Table>
      </Box>
    </Flex>
  );
}
