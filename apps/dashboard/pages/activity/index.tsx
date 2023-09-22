import React from 'react';
import { ReceivedView } from '@components/activity/views/received/received.view';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { TrainedView } from '@components/activity/views/trained/trained.view';
import { InteractionsView } from '@components/activity/views/interactions/interactions.view';
import Head from 'next/head';

export const Activity = () => {
  return (
    <>
      <Head>
        <title>Activity</title>
      </Head>
      <Box maxW="xl" mx="auto">
        <Tabs>
          <TabList>
            <Tab>Received</Tab>
            <Tab>Trained</Tab>
            <Tab>Challenge Interactions</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ReceivedView />
            </TabPanel>
            <TabPanel>
              <TrainedView />
            </TabPanel>
            <TabPanel>
              <InteractionsView />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
export default Activity;
