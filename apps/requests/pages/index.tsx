import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { gql } from '@apollo/client';

import SentRequests from '@components/requests/sent-requests';
import PageRequests from '@components/requests/page-requests';

gql`
  mutation CreateDonationRequest($input: DonationRequestInput!) {
    donationRequest(input: $input) {
      id
      amountInCents
      createdAt
      memo
      isFeatured
      cta
      isActive
      type
      name
    }
  }

  query DonationRequests($input: DonationRequestsInput!) {
    donationRequests(input: $input) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        totalResults
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
          id
          amountInCents
          createdAt
          memo
          isFeatured
          cta
          isActive
          type
          name
          stats {
            donationCount
            donationTotal
            viewCount
          }
        }
      }
    }
  }
`;

export default function Index() {
  return (
    <Tabs>
      <TabList>
        <Tab>Donation Pages</Tab>
        <Tab>Sent Requests</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <PageRequests />
        </TabPanel>
        <TabPanel>
          <SentRequests />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
