import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AllowedThread = {
  __typename?: 'AllowedThread';
  allowedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  reason: AllowedThreadReasonEnum;
};

export enum AllowedThreadReasonEnum {
  AllowedSenderStarted = 'AllowedSenderStarted',
  UserParticipatingOn = 'UserParticipatingOn'
}

export type Challenge = {
  __typename?: 'Challenge';
  action: ChallengeActionEnum;
  body: Scalars['String'];
  connection: Connection;
  createdAt: Scalars['DateTime'];
  /** Challenge has a donation interaction from the sender */
  hasDonation: Scalars['Boolean'];
  /** Challenge has a expected interaction from the sender */
  hasExpected: Scalars['Boolean'];
  id: Scalars['ID'];
  injectResponses: Scalars['Boolean'];
  interactions: ChallengeInteractionsConnection;
  message: Message;
  mode: ChallengeModeEnum;
  nonprofit: Nonprofit;
  sentMessage: Message;
  template: ChallengeTemplate;
  thread: Thread;
  to: Scalars['String'];
  withholdReason?: Maybe<ChallengeWitholdReasonEnum>;
};


export type ChallengeInteractionsArgs = {
  input: ChallengeInteractionsInput;
};

export enum ChallengeActionEnum {
  Present = 'Present',
  Withhold = 'Withhold'
}

export type ChallengeConnectionSetting = {
  __typename?: 'ChallengeConnectionSetting';
  donateBlock?: Maybe<Scalars['String']>;
  expectedBlock?: Maybe<Scalars['String']>;
  greetingBlock?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  leadBlock?: Maybe<Scalars['String']>;
  mode: ChallengeModeEnum;
  signatureBlock?: Maybe<Scalars['String']>;
  template?: Maybe<ChallengeTemplate>;
  updatedAt: Scalars['DateTime'];
};

export type ChallengeConnectionSettingsInput = {
  connectionId: Scalars['String'];
  donateBlock?: InputMaybe<Scalars['String']>;
  expectedBlock?: InputMaybe<Scalars['String']>;
  greetingBlock?: InputMaybe<Scalars['String']>;
  leadBlock?: InputMaybe<Scalars['String']>;
  mode: ChallengeModeEnum;
  signatureBlock?: InputMaybe<Scalars['String']>;
  templateId?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type ChallengeEdge = {
  __typename?: 'ChallengeEdge';
  cursor: Scalars['String'];
  node: Challenge;
};

export enum ChallengeExpectedReasonEnum {
  KnowPersonally = 'KnowPersonally',
  NonEmailFollowUp = 'NonEmailFollowUp',
  Other = 'Other',
  RequestedMessage = 'RequestedMessage'
}

export type ChallengeInteraction = {
  __typename?: 'ChallengeInteraction';
  challenge: Challenge;
  expectedReason?: Maybe<ChallengeExpectedReasonEnum>;
  expectedReasonDescription?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  interaction: ChallengeInteractionEnum;
  paymentAmount?: Maybe<Scalars['Float']>;
  performedAt: Scalars['DateTime'];
  personalizedNote?: Maybe<Scalars['String']>;
};

export type ChallengeInteractionEdge = {
  __typename?: 'ChallengeInteractionEdge';
  cursor: Scalars['String'];
  node: ChallengeInteraction;
};

export enum ChallengeInteractionEnum {
  Clicked = 'Clicked',
  Donated = 'Donated',
  Expected = 'Expected',
  Opened = 'Opened',
  UserExpectedConsentDenied = 'UserExpectedConsentDenied',
  UserExpectedConsentGranted = 'UserExpectedConsentGranted',
  UserReplied = 'UserReplied'
}

export type ChallengeInteractionsConnection = {
  __typename?: 'ChallengeInteractionsConnection';
  edges: Array<ChallengeInteractionEdge>;
  pageInfo: PageInfo;
};

export type ChallengeInteractionsInput = {
  interaction?: InputMaybe<ChallengeInteractionEnum>;
  pagination?: InputMaybe<Pagination>;
};

export type ChallengeMarkExpectedInput = {
  expectedReason?: InputMaybe<ChallengeExpectedReasonEnum>;
  expectedReasonDescription?: InputMaybe<Scalars['String']>;
  personalizedNote?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

export enum ChallengeModeEnum {
  Disable = 'Disable',
  Draft = 'Draft',
  Send = 'Send'
}

export type ChallengeSenderDonateInput = {
  amountInCents: Scalars['Float'];
  chargeProvider: PaymentProviderEnum;
  chargeToken: Scalars['String'];
  paymentToken: Scalars['String'];
  personalizedNote: Scalars['String'];
};

export type ChallengeStatsResponse = {
  __typename?: 'ChallengeStatsResponse';
  challengesSent: Scalars['Float'];
  donationAllTimeHigh: Scalars['Float'];
  donationCount: Scalars['Float'];
  donationTotal: Scalars['Float'];
};

export type ChallengeTemplate = {
  __typename?: 'ChallengeTemplate';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  donateBlock: Scalars['String'];
  expectedBlock: Scalars['String'];
  greetingBlock: Scalars['String'];
  id: Scalars['ID'];
  isEnabled: Scalars['Boolean'];
  leadBlock: Scalars['String'];
  name: Scalars['String'];
  signatureBlock: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ChallengeTemplateAddInput = {
  body: Scalars['String'];
  donateBlock: Scalars['String'];
  expectedBlock: Scalars['String'];
  greetingBlock: Scalars['String'];
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  leadBlock: Scalars['String'];
  name: Scalars['String'];
  signatureBlock: Scalars['String'];
};

export type ChallengeTemplatePreviewInput = {
  connectionId: Scalars['String'];
  donateBlock?: InputMaybe<Scalars['String']>;
  expectedBlock?: InputMaybe<Scalars['String']>;
  greetingBlock?: InputMaybe<Scalars['String']>;
  leadBlock?: InputMaybe<Scalars['String']>;
  signatureBlock?: InputMaybe<Scalars['String']>;
  templateId: Scalars['String'];
};

export type ChallengeTemplateToggleInput = {
  challengeTemplateId: Scalars['String'];
  isEnabled: Scalars['Boolean'];
};

export type ChallengeTemplateUpdateInput = {
  body: Scalars['String'];
  challengeTemplateId: Scalars['String'];
  donateBlock: Scalars['String'];
  expectedBlock: Scalars['String'];
  greetingBlock: Scalars['String'];
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  leadBlock: Scalars['String'];
  name: Scalars['String'];
  signatureBlock: Scalars['String'];
};

export type ChallengeTemplatesResponse = {
  __typename?: 'ChallengeTemplatesResponse';
  challengeTemplates: Array<ChallengeTemplate>;
};

export type ChallengeUserSetting = {
  __typename?: 'ChallengeUserSetting';
  id: Scalars['ID'];
  injectResponses: Scalars['Boolean'];
  /** Minimum allowed donation for user, represented in cents */
  minimumDonation: Scalars['Float'];
  nonprofit: Nonprofit;
  nonprofitReason?: Maybe<Scalars['String']>;
  signature: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ChallengeUserSettingsUpdateInput = {
  injectResponses?: InputMaybe<Scalars['Boolean']>;
  minimumDonation?: InputMaybe<Scalars['Float']>;
  nonprofitId: Scalars['String'];
  nonprofitReason?: InputMaybe<Scalars['String']>;
  signature?: InputMaybe<Scalars['String']>;
};

export enum ChallengeWitholdReasonEnum {
  CalendarEvent = 'CalendarEvent',
  RecentChallenge = 'RecentChallenge',
  UserDisableSetting = 'UserDisableSetting'
}

export type ChallengesConnection = {
  __typename?: 'ChallengesConnection';
  edges: Array<ChallengeEdge>;
  pageInfo: PageInfo;
};

export type ChallengesInput = {
  filter?: InputMaybe<ChallengesRequestFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type ChallengesRequestFilter = {
  recipient?: InputMaybe<Scalars['String']>;
};

export type Connection = {
  __typename?: 'Connection';
  challengeSettings: ChallengeConnectionSetting;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  emailAddress: Scalars['String'];
  id: Scalars['ID'];
  isActivated: Scalars['Boolean'];
  isDisabled?: Maybe<Scalars['Boolean']>;
  isSyncing: Scalars['Boolean'];
  logs: Array<ConnectionLog>;
  managedBy: ManagedByEnum;
  provider: ProviderEnum;
  status: StatusEnum;
  syncs: Array<ConnectionSync>;
};


export type ConnectionLogsArgs = {
  pagination?: InputMaybe<Pagination>;
};

export type ConnectionActivateInput = {
  connectionId: Scalars['String'];
};

export type ConnectionChangeManagedByInput = {
  connectionId: Scalars['String'];
  insertLabelInstructions?: InputMaybe<Scalars['Boolean']>;
  manageBy: ManagedByEnum;
};

export type ConnectionDeactivateInput = {
  connectionId: Scalars['String'];
};

export type ConnectionLog = {
  __typename?: 'ConnectionLog';
  connection: Connection;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isActivated?: Maybe<Scalars['Boolean']>;
  status: StatusEnum;
};

export type ConnectionLogEdge = {
  __typename?: 'ConnectionLogEdge';
  cursor: Scalars['String'];
  node: ConnectionLog;
};

export type ConnectionStatusInput = {
  connectionId: Scalars['String'];
  status: StatusEnum;
};

export type ConnectionSync = {
  __typename?: 'ConnectionSync';
  connection: Connection;
  finishedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isFinished: Scalars['Boolean'];
  isSyncing: Scalars['Boolean'];
  lastDepth?: Maybe<Scalars['DateTime']>;
  startedAt?: Maybe<Scalars['DateTime']>;
  targetDepth: Scalars['DateTime'];
  type: SyncTypeEnum;
};

export type ConnectionUnlinkInput = {
  connectionId: Scalars['String'];
  experienceText?: InputMaybe<Scalars['String']>;
  reasonText?: InputMaybe<Scalars['String']>;
};

export type Decision = {
  __typename?: 'Decision';
  allowedThread?: Maybe<AllowedThread>;
  challenge?: Maybe<Challenge>;
  connection: Connection;
  decidedAt: Scalars['DateTime'];
  emailAddress: Scalars['String'];
  enforcedOptOutAddress?: Maybe<OptOutAddress>;
  enforcedPattern?: Maybe<Pattern>;
  enforcedTraining?: Maybe<Training>;
  id: Scalars['ID'];
  message: Message;
  overrulingMade?: Maybe<OverruleEnum>;
  ruling: RuleEnum;
  verdict: VerdictEnum;
};

export type DecisionEdge = {
  __typename?: 'DecisionEdge';
  cursor: Scalars['String'];
  node: Decision;
};

export type DecisionsCollection = {
  __typename?: 'DecisionsCollection';
  edges: Array<DecisionEdge>;
  pageInfo: PageInfo;
};

export type DecisionsInput = {
  filter?: InputMaybe<DecisionsRequestFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type DecisionsRequestFilter = {
  rulings?: InputMaybe<Array<RuleEnum>>;
  search?: InputMaybe<Scalars['String']>;
};

export type DeleteAccountRequest = {
  experienceText?: InputMaybe<Scalars['String']>;
  reasonText?: InputMaybe<Scalars['String']>;
};

export type DonateInput = {
  amountInCents: Scalars['Float'];
  chargeProvider: PaymentProviderEnum;
  chargeToken: Scalars['String'];
  donationRequestId: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
};

export type DonateResponse = {
  __typename?: 'DonateResponse';
  donatedInteraction: DonationRequestInteraction;
  thankYouMessage?: Maybe<Scalars['String']>;
};

export type DonationEdge = {
  __typename?: 'DonationEdge';
  cursor: Scalars['String'];
  node: DonationRequestInteraction;
};

export type DonationRequest = {
  __typename?: 'DonationRequest';
  amountInCents: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  cta?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  donations: DonationsConnection;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isFeatured?: Maybe<Scalars['Boolean']>;
  lastDonatedAt?: Maybe<Scalars['DateTime']>;
  memo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nonprofit: Nonprofit;
  stats: DonationRequestStatsResponse;
  thankYouMessage?: Maybe<Scalars['String']>;
  type: DonationRequestTypeEnum;
};


export type DonationRequestDonationsArgs = {
  input: DonationsWithoutRequestIdInput;
};

export type DonationRequestEdge = {
  __typename?: 'DonationRequestEdge';
  cursor: Scalars['String'];
  node: DonationRequest;
};

export type DonationRequestInput = {
  allowExemptionRequest?: InputMaybe<Scalars['Boolean']>;
  amountInCents: Scalars['Float'];
  cta?: InputMaybe<Scalars['String']>;
  /** Leave empty to do a create. Provide to do an update */
  id?: InputMaybe<Scalars['ID']>;
  isFeatured?: InputMaybe<Scalars['Boolean']>;
  memo: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  nonprofitId?: InputMaybe<Scalars['String']>;
  thankYouMessage?: InputMaybe<Scalars['String']>;
  type: DonationRequestTypeEnum;
};

export type DonationRequestInteraction = {
  __typename?: 'DonationRequestInteraction';
  amountInCents?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  interaction: DonationRequestInteractionEnum;
  note?: Maybe<Scalars['String']>;
  performedAt: Scalars['DateTime'];
  request: DonationRequest;
};

export enum DonationRequestInteractionEnum {
  Donated = 'Donated',
  ExemptionDenied = 'ExemptionDenied',
  ExemptionGranted = 'ExemptionGranted',
  ExemptionRequested = 'ExemptionRequested',
  Visited = 'Visited'
}

export type DonationRequestStatsInput = {
  /** If not provided, user-wide stats are returned */
  donationRequestId?: InputMaybe<Scalars['String']>;
};

export type DonationRequestStatsResponse = {
  __typename?: 'DonationRequestStatsResponse';
  donationCount: Scalars['Float'];
  donationTotal: Scalars['Float'];
  viewCount: Scalars['Float'];
};

export enum DonationRequestTypeEnum {
  LongLiving = 'LongLiving',
  SingleUse = 'SingleUse'
}

export type DonationRequestsConnection = {
  __typename?: 'DonationRequestsConnection';
  edges: Array<DonationRequestEdge>;
  pageInfo: PageInfo;
};

export type DonationRequestsInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<Pagination>;
  type: DonationRequestTypeEnum;
};

export type DonationTotalFromSenderQueryInput = {
  /** The domain or email address to get total donations for */
  sender: Scalars['String'];
};

export type DonationTotalFromSenderQueryResponse = {
  __typename?: 'DonationTotalFromSenderQueryResponse';
  donationsCount: Scalars['Float'];
  totalAmountInCents: Scalars['Float'];
};

export type DonationsConnection = {
  __typename?: 'DonationsConnection';
  edges: Array<DonationEdge>;
  pageInfo: PageInfo;
};

export type DonationsInput = {
  donationRequestId?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<Pagination>;
};

export type DonationsWithoutRequestIdInput = {
  pagination?: InputMaybe<Pagination>;
};

export type EmailProviderIsGoogleRequestDto = {
  emailAddress: Scalars['String'];
};

export type EmailProviderIsGoogleResponseDto = {
  __typename?: 'EmailProviderIsGoogleResponseDto';
  emailAddress: Scalars['String'];
  isGoogle: Scalars['Boolean'];
};

export type GatekeeperTestQueryInput = {
  address: Scalars['String'];
};

export type GatekeeperTestQueryResponse = {
  __typename?: 'GatekeeperTestQueryResponse';
  address: Scalars['String'];
  enforcedPattern?: Maybe<Pattern>;
  enforcedTraining?: Maybe<Training>;
  ruling: RuleEnum;
  verdict: VerdictEnum;
};

export enum ManagedByEnum {
  Internal = 'Internal',
  Nylas = 'Nylas'
}

export type Message = {
  __typename?: 'Message';
  bcc: Array<MessageParticipant>;
  cc: Array<MessageParticipant>;
  challenge?: Maybe<Challenge>;
  connection: Connection;
  createdAt?: Maybe<Scalars['DateTime']>;
  decision?: Maybe<Decision>;
  from: MessageParticipant;
  id: Scalars['ID'];
  isAnonymized: Scalars['Boolean'];
  isAutomated?: Maybe<Scalars['Boolean']>;
  isMailingList: Scalars['Boolean'];
  receivedAt: Scalars['DateTime'];
  replyTo: Array<MessageParticipant>;
  thread?: Maybe<Thread>;
  to: Array<MessageParticipant>;
  type: MessageTypeEnum;
  wasSentBySystem: Scalars['Boolean'];
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  cursor: Scalars['String'];
  node: Message;
};

export type MessageParticipant = {
  __typename?: 'MessageParticipant';
  displayName?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
};

export enum MessageTypeEnum {
  Received = 'Received',
  Sent = 'Sent'
}

export type MessagesCollection = {
  __typename?: 'MessagesCollection';
  edges: Array<MessageEdge>;
  pageInfo: PageInfo;
};

export type MessagesInput = {
  filter?: InputMaybe<MessagesRequestFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type MessagesRequestFilter = {
  after?: InputMaybe<Scalars['DateTime']>;
  before?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<MessageTypeEnum>;
};

export type Mutation = {
  __typename?: 'Mutation';
  challengeConnectionSettingsUpdate: ChallengeConnectionSetting;
  challengeMarkExpected: Scalars['Boolean'];
  challengeSenderDonate: Scalars['Boolean'];
  challengeTemplateAdd: ChallengeTemplate;
  challengeTemplateToggle: ChallengeTemplate;
  challengeTemplateUpdate: ChallengeTemplate;
  challengeUserSettingsUpdate: ChallengeUserSetting;
  connectionActivate: Connection;
  connectionDeactivate: Connection;
  connectionManagedBy: Connection;
  connectionStatus: Connection;
  connectionUnlink: Connection;
  /** @deprecated offboard mutation is preferred method */
  disableUser: User;
  donate: DonateResponse;
  donationRequest: DonationRequest;
  nonprofitAdd: Nonprofit;
  nonprofitCategoryAdd: NonprofitCategory;
  nonprofitCategoryRemove: Scalars['Boolean'];
  nonprofitCategoryUpdate: NonprofitCategory;
  nonprofitRemove: Scalars['Boolean'];
  nonprofitSetDefault: SetDefaultNonprofitResponse;
  nonprofitUpdate: Nonprofit;
  notificationAddPushToken: Scalars['Boolean'];
  notificationUserSettingsAdminUpdate: NotificationUserSettings;
  notificationUserSettingsUpdate: NotificationUserSettings;
  notificationsAcknowledge: Scalars['Boolean'];
  offboard: User;
  optOutAddressAdd: OptOutAddress;
  optOutAddressRemove: Scalars['Boolean'];
  patternAdd: Pattern;
  patternRemove: Scalars['Boolean'];
  patternUpdate: Pattern;
  paymentCharge: Scalars['Boolean'];
  trainAddress: Training;
  trainDomain: Training;
  userHandle: User;
  userTaskResolved: UserTask;
  userUpdate: User;
  userUpdatePersonalization: User;
  userUpdateRoles: User;
};


export type MutationChallengeConnectionSettingsUpdateArgs = {
  input: ChallengeConnectionSettingsInput;
};


export type MutationChallengeMarkExpectedArgs = {
  input: ChallengeMarkExpectedInput;
};


export type MutationChallengeSenderDonateArgs = {
  input: ChallengeSenderDonateInput;
};


export type MutationChallengeTemplateAddArgs = {
  input: ChallengeTemplateAddInput;
};


export type MutationChallengeTemplateToggleArgs = {
  input: ChallengeTemplateToggleInput;
};


export type MutationChallengeTemplateUpdateArgs = {
  input: ChallengeTemplateUpdateInput;
};


export type MutationChallengeUserSettingsUpdateArgs = {
  input: ChallengeUserSettingsUpdateInput;
};


export type MutationConnectionActivateArgs = {
  input: ConnectionActivateInput;
};


export type MutationConnectionDeactivateArgs = {
  input: ConnectionDeactivateInput;
};


export type MutationConnectionManagedByArgs = {
  input: ConnectionChangeManagedByInput;
};


export type MutationConnectionStatusArgs = {
  input: ConnectionStatusInput;
};


export type MutationConnectionUnlinkArgs = {
  input: ConnectionUnlinkInput;
};


export type MutationDisableUserArgs = {
  userId: Scalars['String'];
};


export type MutationDonateArgs = {
  input: DonateInput;
};


export type MutationDonationRequestArgs = {
  input: DonationRequestInput;
};


export type MutationNonprofitAddArgs = {
  input: NonprofitAddInput;
};


export type MutationNonprofitCategoryAddArgs = {
  input: NonprofitCategoryAddInput;
};


export type MutationNonprofitCategoryRemoveArgs = {
  input: NonprofitCategoryRemoveInput;
};


export type MutationNonprofitCategoryUpdateArgs = {
  input: NonprofitCategoryUpdateInput;
};


export type MutationNonprofitRemoveArgs = {
  input: NonprofitRemoveInput;
};


export type MutationNonprofitSetDefaultArgs = {
  input: NonprofitSetDefaultInput;
};


export type MutationNonprofitUpdateArgs = {
  input: NonprofitUpdateInput;
};


export type MutationNotificationAddPushTokenArgs = {
  input: NotificationAddPushTokenInput;
};


export type MutationNotificationUserSettingsAdminUpdateArgs = {
  input: NotificationUserSettingsUpdateAdminInput;
};


export type MutationNotificationUserSettingsUpdateArgs = {
  input: NotificationUserSettingsUpdateInput;
};


export type MutationOffboardArgs = {
  input: DeleteAccountRequest;
};


export type MutationOptOutAddressAddArgs = {
  input: OptOutAddressAddInput;
};


export type MutationOptOutAddressRemoveArgs = {
  input: OptOutAddressRemoveInput;
};


export type MutationPatternAddArgs = {
  input: PatternAddInput;
};


export type MutationPatternRemoveArgs = {
  input: PatternRemoveInput;
};


export type MutationPatternUpdateArgs = {
  input: PatternUpdateInput;
};


export type MutationPaymentChargeArgs = {
  input: PaymentChargeInput;
};


export type MutationTrainAddressArgs = {
  input: TrainAddressInput;
};


export type MutationTrainDomainArgs = {
  input: TrainDomainInput;
};


export type MutationUserHandleArgs = {
  input: UserHandleInput;
};


export type MutationUserTaskResolvedArgs = {
  input: UserTaskResolvedInput;
};


export type MutationUserUpdateArgs = {
  input: UserUpdateInput;
};


export type MutationUserUpdatePersonalizationArgs = {
  input: UserPersonalizationUpdateInput;
};


export type MutationUserUpdateRolesArgs = {
  roles: Array<UserRoleEnum>;
  userId: Scalars['String'];
};

export type NetworkConnection = {
  __typename?: 'NetworkConnection';
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  externalIdentifier: Scalars['String'];
  id: Scalars['ID'];
  joinedAt: Scalars['DateTime'];
  metWithGated: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type NetworkConnectionEdge = {
  __typename?: 'NetworkConnectionEdge';
  cursor: Scalars['String'];
  node: NetworkConnection;
};

export type NetworkConnectionStatsResponse = {
  __typename?: 'NetworkConnectionStatsResponse';
  allKnown: Scalars['Int'];
  metWithGated: Scalars['Int'];
  usingGated: Scalars['Int'];
};

export type NetworkConnectionsConnection = {
  __typename?: 'NetworkConnectionsConnection';
  edges: Array<NetworkConnectionEdge>;
  pageInfo: PageInfo;
};

export type NetworkConnectionsFilter = {
  isNotUsingGated?: InputMaybe<Scalars['Boolean']>;
  isUsingGated?: InputMaybe<Scalars['Boolean']>;
};

export type NetworkConnectionsInput = {
  filter?: InputMaybe<NetworkConnectionsFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type Nonprofit = {
  __typename?: 'Nonprofit';
  art?: Maybe<Scalars['String']>;
  category: NonprofitCategory;
  description: Scalars['String'];
  ein?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  isDisplayed: Scalars['Boolean'];
  isFeatured?: Maybe<Scalars['Boolean']>;
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type NonprofitAddInput = {
  categoryId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  ein?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['String']>;
  isDisplayed?: InputMaybe<Scalars['Boolean']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

export type NonprofitCategoriesResponse = {
  __typename?: 'NonprofitCategoriesResponse';
  nonprofitCategories: Array<NonprofitCategory>;
};

export type NonprofitCategory = {
  __typename?: 'NonprofitCategory';
  childrenCategories?: Maybe<Array<NonprofitCategory>>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  nonprofits: Array<Nonprofit>;
  parentCategory?: Maybe<NonprofitCategory>;
};

export type NonprofitCategoryAddInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type NonprofitCategoryRemoveInput = {
  nonprofitCategoryId: Scalars['String'];
};

export type NonprofitCategoryUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  nonprofitCategoryId: Scalars['String'];
};

export type NonprofitRemoveInput = {
  nonprofitId: Scalars['String'];
};

export type NonprofitSetDefaultInput = {
  nonprofitId: Scalars['String'];
};

export type NonprofitUpdateInput = {
  categoryId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  ein?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['String']>;
  isDisplayed?: InputMaybe<Scalars['Boolean']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  nonprofitId: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

export type NonprofitsInput = {
  categoryId?: InputMaybe<Scalars['String']>;
  isDisplay?: InputMaybe<Scalars['Boolean']>;
  isFeatured?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
};

export type NonprofitsResponse = {
  __typename?: 'NonprofitsResponse';
  nonprofits: Array<Nonprofit>;
};

export type NotificationAddPushTokenInput = {
  device: Scalars['String'];
  token: Scalars['String'];
};

export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor: Scalars['String'];
  node: TxEmail;
};

export type NotificationUserSettings = {
  __typename?: 'NotificationUserSettings';
  deletedAt?: Maybe<Scalars['DateTime']>;
  disableTxEmail?: Maybe<Array<TransactionEnum>>;
  email: Scalars['String'];
  id: Scalars['ID'];
  unread: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type NotificationUserSettingsUpdateAdminInput = {
  disableTxEmail: Array<TransactionEnum>;
  emailAddress: Scalars['String'];
  userId: Scalars['String'];
};

export type NotificationUserSettingsUpdateInput = {
  emailAddress: Scalars['String'];
};

export type NotificationsConnection = {
  __typename?: 'NotificationsConnection';
  edges: Array<NotificationEdge>;
  pageInfo: PageInfo;
};

export type NotificationsInput = {
  pagination?: InputMaybe<Pagination>;
};

export type OptOutAddress = {
  __typename?: 'OptOutAddress';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  emailAddress: Scalars['String'];
  id: Scalars['ID'];
};

export type OptOutAddressAddInput = {
  emailAddress: Scalars['String'];
};

export type OptOutAddressRemoveInput = {
  optOutId: Scalars['String'];
};

export enum OverruleEnum {
  CalenderEventMute = 'CalenderEventMute',
  UserOnBccMute = 'UserOnBccMute'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  totalResults: Scalars['Float'];
};

export type Pagination = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
};

export type Pattern = {
  __typename?: 'Pattern';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  expression: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  rule: RuleEnum;
  updatedAt: Scalars['DateTime'];
};

export type PatternAddInput = {
  description?: InputMaybe<Scalars['String']>;
  expression: Scalars['String'];
  /** Pattern name. Max length 255 chars */
  name: Scalars['String'];
  rule: RuleEnum;
};

export type PatternRemoveInput = {
  patternId: Scalars['String'];
};

export type PatternUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  expression: Scalars['String'];
  /** Pattern name. Max length 255 chars */
  name: Scalars['String'];
  patternId: Scalars['String'];
  rule: RuleEnum;
};

export type PatternsConnection = {
  __typename?: 'PatternsConnection';
  edges: Array<PatternsEdge>;
  pageInfo: PageInfo;
};

export type PatternsEdge = {
  __typename?: 'PatternsEdge';
  cursor: Scalars['String'];
  node: Pattern;
};

export type PatternsInput = {
  filter?: InputMaybe<PatternsRequestFilter>;
  pagination?: InputMaybe<Pagination>;
};

export type PatternsRequestFilter = {
  rule?: InputMaybe<Array<RuleEnum>>;
  search?: InputMaybe<Scalars['String']>;
  test?: InputMaybe<Scalars['String']>;
};

export type PaymentChargeInput = {
  amountCents: Scalars['Float'];
  authenticationToken?: InputMaybe<Scalars['String']>;
  chargeToken: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  paymentToken: Scalars['String'];
  provider: PaymentProviderEnum;
};

export enum PaymentProviderEnum {
  Stripe = 'STRIPE'
}

export type PreviewAllowedResponse = {
  __typename?: 'PreviewAllowedResponse';
  results: Array<PreviewAllowedSender>;
};

export type PreviewAllowedSender = {
  __typename?: 'PreviewAllowedSender';
  id: Scalars['ID'];
  rule: RuleEnum;
  sender: MessageParticipant;
};

export enum ProviderEnum {
  Google = 'Google'
}

export type Query = {
  __typename?: 'Query';
  challenge: Challenge;
  challengeInteraction: ChallengeInteraction;
  challengeInteractions: ChallengeInteractionsConnection;
  challengeSettings: ChallengeUserSetting;
  challengeStats: ChallengeStatsResponse;
  challengeTemplate: ChallengeTemplate;
  challengeTemplatePreview: Scalars['String'];
  challengeTemplates: ChallengeTemplatesResponse;
  challenges: ChallengesConnection;
  connection: Connection;
  decision: Decision;
  decisionTest: GatekeeperTestQueryResponse;
  decisions: DecisionsCollection;
  donation: DonationRequestInteraction;
  donationRequest: DonationRequest;
  donationRequestStats: DonationRequestStatsResponse;
  donationRequests: DonationRequestsConnection;
  donationTotalFromSender: DonationTotalFromSenderQueryResponse;
  donations: DonationsConnection;
  me: User;
  message: Message;
  messages: MessagesCollection;
  networkConnectionStats: NetworkConnectionStatsResponse;
  networkConnections: NetworkConnectionsConnection;
  nonprofit: Nonprofit;
  nonprofitCategories: NonprofitCategoriesResponse;
  nonprofitCategory: NonprofitCategory;
  nonprofitDefault: Nonprofit;
  nonprofits: NonprofitsResponse;
  notificationUserSettings: NotificationUserSettings;
  notifications: NotificationsConnection;
  optOutAddresses: Array<OptOutAddress>;
  patterns: PatternsConnection;
  previewAllowed: PreviewAllowedResponse;
  providerFromAddress: EmailProviderIsGoogleResponseDto;
  sentReceivedStat: SentReceivedStat;
  sentReceivedStats: SentReceivedStatsConnection;
  stats: StatsResponse;
  trainingSearch: TrainingsConnection;
  user: User;
  userHandleAvailable: Scalars['Boolean'];
  userSearch: UserSearchResponse;
  userTasks: Array<UserTask>;
  volumeStats: VolumeStat;
};


export type QueryChallengeArgs = {
  id: Scalars['ID'];
};


export type QueryChallengeInteractionArgs = {
  id: Scalars['ID'];
};


export type QueryChallengeInteractionsArgs = {
  input: ChallengeInteractionsInput;
};


export type QueryChallengeTemplateArgs = {
  id: Scalars['ID'];
};


export type QueryChallengeTemplatePreviewArgs = {
  input: ChallengeTemplatePreviewInput;
};


export type QueryChallengesArgs = {
  input: ChallengesInput;
};


export type QueryConnectionArgs = {
  id: Scalars['ID'];
};


export type QueryDecisionArgs = {
  id: Scalars['ID'];
};


export type QueryDecisionTestArgs = {
  input: GatekeeperTestQueryInput;
};


export type QueryDecisionsArgs = {
  input: DecisionsInput;
};


export type QueryDonationArgs = {
  id: Scalars['ID'];
};


export type QueryDonationRequestArgs = {
  id: Scalars['ID'];
};


export type QueryDonationRequestStatsArgs = {
  input: DonationRequestStatsInput;
};


export type QueryDonationRequestsArgs = {
  input: DonationRequestsInput;
};


export type QueryDonationTotalFromSenderArgs = {
  input: DonationTotalFromSenderQueryInput;
};


export type QueryDonationsArgs = {
  input: DonationsInput;
};


export type QueryMessageArgs = {
  id: Scalars['ID'];
};


export type QueryMessagesArgs = {
  input: MessagesInput;
};


export type QueryNetworkConnectionsArgs = {
  input: NetworkConnectionsInput;
};


export type QueryNonprofitArgs = {
  id: Scalars['ID'];
};


export type QueryNonprofitCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryNonprofitsArgs = {
  input: NonprofitsInput;
};


export type QueryNotificationsArgs = {
  input: NotificationsInput;
};


export type QueryPatternsArgs = {
  input: PatternsInput;
};


export type QueryPreviewAllowedArgs = {
  id: Scalars['ID'];
};


export type QueryProviderFromAddressArgs = {
  input: EmailProviderIsGoogleRequestDto;
};


export type QuerySentReceivedStatArgs = {
  input: SentReceivedStatQueryInput;
};


export type QuerySentReceivedStatsArgs = {
  input: SentReceivedStatsInput;
};


export type QueryTrainingSearchArgs = {
  input: TrainingsSearchInput;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserHandleAvailableArgs = {
  input: UserHandleAvailableQueryInput;
};


export type QueryUserSearchArgs = {
  query: Scalars['String'];
};


export type QueryUserTasksArgs = {
  input: UserTasksQueryInput;
};


export type QueryVolumeStatsArgs = {
  input: VolumeStatsRequestDto;
};

export enum RuleEnum {
  Allow = 'Allow',
  Gate = 'Gate',
  Ignore = 'Ignore',
  Mute = 'Mute'
}

export type SearchTrainingsFilter = {
  rule?: InputMaybe<RuleEnum>;
};

export enum SearchTrainingsTypeEnum {
  Addresses = 'Addresses',
  Domains = 'Domains'
}

export type SentReceivedStat = {
  __typename?: 'SentReceivedStat';
  domain: Scalars['String'];
  firstSeenAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  lastSeenAt?: Maybe<Scalars['DateTime']>;
  receivedCount: Scalars['Float'];
  sentCount: Scalars['Float'];
  training?: Maybe<Training>;
  username?: Maybe<Scalars['String']>;
};

export type SentReceivedStatQueryInput = {
  sender: Scalars['String'];
};

export enum SentReceivedStatSortByEnum {
  LastSeenAt = 'LastSeenAt',
  ReceivedCount = 'ReceivedCount',
  SendCount = 'SendCount',
  FirstSeenAt = 'firstSeenAt'
}

export enum SentReceivedStatTypeEnum {
  Address = 'Address',
  Domain = 'Domain'
}

export type SentReceivedStatsConnection = {
  __typename?: 'SentReceivedStatsConnection';
  edges: Array<SentReceivedStatsEdge>;
  pageInfo: PageInfo;
};

export type SentReceivedStatsEdge = {
  __typename?: 'SentReceivedStatsEdge';
  cursor: Scalars['String'];
  node: SentReceivedStat;
};

export type SentReceivedStatsFilterInput = {
  firstSeenAtBefore?: InputMaybe<Scalars['DateTime']>;
  firstSeenAtSince?: InputMaybe<Scalars['DateTime']>;
  /** Limit results to a specific domain */
  forDomain?: InputMaybe<Scalars['String']>;
  lastSeenAtBefore?: InputMaybe<Scalars['DateTime']>;
  lastSeenAtSince?: InputMaybe<Scalars['DateTime']>;
  query?: InputMaybe<Scalars['String']>;
  receivedCountGreaterThan?: InputMaybe<Scalars['Float']>;
  receivedCountLessThan?: InputMaybe<Scalars['Float']>;
  sentCountGreaterThan?: InputMaybe<Scalars['Float']>;
  sentCountLessThan?: InputMaybe<Scalars['Float']>;
};

export type SentReceivedStatsInput = {
  filter?: InputMaybe<SentReceivedStatsFilterInput>;
  pagination?: InputMaybe<Pagination>;
  sortBy?: InputMaybe<SentReceivedStatSortByEnum>;
  type: SentReceivedStatTypeEnum;
};

export type SetDefaultNonprofitResponse = {
  __typename?: 'SetDefaultNonprofitResponse';
  nonprofits: Array<Nonprofit>;
};

export type Stats = {
  __typename?: 'Stats';
  allowedCount: Scalars['Int'];
  gatedCount: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type StatsResponse = {
  __typename?: 'StatsResponse';
  allTime: Stats;
  lastMonth: Stats;
  lastThirtyDays: Stats;
  monthToDate: Stats;
  previousThirtyDays: Stats;
  yearToDate: Stats;
};

export enum StatusEnum {
  Initializing = 'Initializing',
  Invalid = 'Invalid',
  Provisioned = 'Provisioned',
  Running = 'Running'
}

export enum SyncTypeEnum {
  Received = 'Received',
  Sent = 'Sent'
}

export type Thread = {
  __typename?: 'Thread';
  connection: Connection;
  createdAt?: Maybe<Scalars['DateTime']>;
  firstMessageAt: Scalars['DateTime'];
  id: Scalars['ID'];
};

export type TrainAddressInput = {
  emailAddress: Scalars['String'];
  origin: TrainingOriginEnum;
  rule: RuleEnum;
};

export type TrainDomainInput = {
  domain: Scalars['String'];
  origin: TrainingOriginEnum;
  rule: RuleEnum;
};

export type Training = {
  __typename?: 'Training';
  createdAt: Scalars['DateTime'];
  domain: Scalars['String'];
  id: Scalars['ID'];
  /** There is upstream rule that will be inherited. Eg: domain training or pattern rule that applies to an unset address training */
  inheritedRule?: Maybe<RuleEnum>;
  origin?: Maybe<TrainingOriginEnum>;
  rule?: Maybe<RuleEnum>;
  username?: Maybe<Scalars['String']>;
  /** The `id` field is generated as an identifier of the username/domain for the training so that the latest version is always in cache. This field is if you need the internal identifier for a particular version of the training. */
  versionId?: Maybe<Scalars['String']>;
};

export type TrainingEdge = {
  __typename?: 'TrainingEdge';
  cursor: Scalars['String'];
  node: Training;
};

export enum TrainingOriginEnum {
  AdminApp = 'AdminApp',
  Calendar = 'Calendar',
  ExpectedInteraction = 'ExpectedInteraction',
  IncludedOnAllowed = 'IncludedOnAllowed',
  InitialDefaults = 'InitialDefaults',
  Migration = 'Migration',
  Pattern = 'Pattern',
  ReceivedEmail = 'ReceivedEmail',
  SentEmail = 'SentEmail',
  UserApp = 'UserApp',
  UserInbox = 'UserInbox'
}

export type TrainingsConnection = {
  __typename?: 'TrainingsConnection';
  edges: Array<TrainingEdge>;
  pageInfo: PageInfo;
};

export type TrainingsSearchInput = {
  filter?: InputMaybe<SearchTrainingsFilter>;
  /** Senders from a particular domain. Not compatible with `query`. */
  forDomain?: InputMaybe<Scalars['String']>;
  /** Limit results to just domain trainings. Defaults to false */
  onlyDomains?: InputMaybe<Scalars['Boolean']>;
  pagination?: InputMaybe<Pagination>;
  /** Search query for trainings */
  query?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<SearchTrainingsTypeEnum>;
};

export enum TransactionEnum {
  AccountRemoved = 'AccountRemoved',
  AllowedMessageToUser = 'AllowedMessageToUser',
  AllowedMessageToUserGatedUser = 'AllowedMessageToUserGatedUser',
  AllowedMessageToUserSameDomain = 'AllowedMessageToUserSameDomain',
  ConnectionReady = 'ConnectionReady',
  ConnectionRemoved = 'ConnectionRemoved',
  ConnectionResumed = 'ConnectionResumed',
  ConnectionStopped = 'ConnectionStopped',
  DonationReceived = 'DonationReceived',
  ExpectedConsentRequested = 'ExpectedConsentRequested',
  FirstConnectionReady = 'FirstConnectionReady',
  FirstDonationReceived = 'FirstDonationReceived',
  FirstExpected = 'FirstExpected',
  PendingFirstConnection = 'PendingFirstConnection',
  ReceiptDonation = 'ReceiptDonation',
  ReceiptExemptionRequested = 'ReceiptExemptionRequested',
  ReceiptExpected = 'ReceiptExpected'
}

export type TxEmail = {
  __typename?: 'TxEmail';
  id: Scalars['ID'];
  sentAt: Scalars['DateTime'];
  toAddress: Scalars['String'];
  toName: Scalars['String'];
  transaction: TransactionEnum;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  challengeSettings: ChallengeUserSetting;
  connections: Array<Connection>;
  disabledAt?: Maybe<Scalars['DateTime']>;
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  handle?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDisabled: Scalars['Boolean'];
  isSignupCompleted: Scalars['Boolean'];
  joinedAt: Scalars['DateTime'];
  lastName: Scalars['String'];
  notificationSettings: NotificationUserSettings;
  notifications: Array<TxEmail>;
  optOutAddresses: Array<OptOutAddress>;
  personalization: UserPersonalization;
  referralCode?: Maybe<Scalars['String']>;
  referredByNetworkConnection?: Maybe<NetworkConnection>;
};


export type UserNotificationsArgs = {
  input: NotificationsInput;
};

export enum UserBenefitEnum {
  Other = 'Other',
  Productivity = 'Productivity',
  SelfHealth = 'SelfHealth',
  SocialGood = 'SocialGood'
}

export type UserBenefitSelection = {
  __typename?: 'UserBenefitSelection';
  benefitLabel: Scalars['String'];
  otherText: Scalars['String'];
  userBenefit: UserBenefitEnum;
};

export type UserBenefitSelectionEntity = {
  benefitLabel: Scalars['String'];
  otherText: Scalars['String'];
  userBenefit: UserBenefitEnum;
};

export type UserHandleAvailableQueryInput = {
  handle: Scalars['String'];
};

export type UserHandleInput = {
  handle: Scalars['String'];
};

export type UserPersonalization = {
  __typename?: 'UserPersonalization';
  userBenefitSelection: UserBenefitSelection;
};

export type UserPersonalizationEntity = {
  userBenefitSelection: UserBenefitSelectionEntity;
};

export type UserPersonalizationUpdateInput = {
  personalization: UserPersonalizationEntity;
};

export enum UserRoleEnum {
  Admin = 'Admin',
  User = 'User'
}

export type UserSearchResponse = {
  __typename?: 'UserSearchResponse';
  results: Array<User>;
};

export type UserTask = {
  __typename?: 'UserTask';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  resolution?: Maybe<UserTaskResolutionEnum>;
  resolvedAt?: Maybe<Scalars['DateTime']>;
  task: UserTaskEnum;
};

export enum UserTaskEnum {
  ChooseNonprofit = 'ChooseNonprofit',
  ConnectFirstAccount = 'ConnectFirstAccount',
  FirstInboxTraining = 'FirstInboxTraining',
  ReviewAllowList = 'ReviewAllowList',
  TakeTour = 'TakeTour',
  TrainDomains = 'TrainDomains'
}

export enum UserTaskResolutionEnum {
  Completed = 'Completed',
  Dismissed = 'Dismissed',
  Pending = 'Pending'
}

export type UserTaskResolvedInput = {
  resolution: UserTaskResolutionEnum;
  task: UserTaskEnum;
};

export type UserTasksQueryInput = {
  onlyUnresolved?: InputMaybe<Scalars['Boolean']>;
};

export type UserUpdateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export enum VerdictEnum {
  AddressAllowed = 'AddressAllowed',
  AddressGated = 'AddressGated',
  AddressMuted = 'AddressMuted',
  CalendarEventAllowed = 'CalendarEventAllowed',
  CalenderRsvpUserOrganizerAllowed = 'CalenderRsvpUserOrganizerAllowed',
  DomainAllowed = 'DomainAllowed',
  DomainGated = 'DomainGated',
  DomainMuted = 'DomainMuted',
  MailingListAddressAllowed = 'MailingListAddressAllowed',
  MailingListAddressGated = 'MailingListAddressGated',
  MailingListAddressMuted = 'MailingListAddressMuted',
  MailingListDomainAllowed = 'MailingListDomainAllowed',
  MailingListDomainGated = 'MailingListDomainGated',
  MailingListDomainMuted = 'MailingListDomainMuted',
  MailingListIgnore = 'MailingListIgnore',
  ParticipantOnAllowedThread = 'ParticipantOnAllowedThread',
  PatternAllowed = 'PatternAllowed',
  PatternGated = 'PatternGated',
  PatternMuted = 'PatternMuted',
  SenderUnknownGated = 'SenderUnknownGated',
  SentAllowed = 'SentAllowed',
  UserOptOutAllowed = 'UserOptOutAllowed'
}

export type VolumeStat = {
  __typename?: 'VolumeStat';
  endAt: Scalars['DateTime'];
  gatedMessages: Scalars['Float'];
  id: Scalars['ID'];
  receivedMessages: Scalars['Float'];
  startAt: Scalars['DateTime'];
};

export type VolumeStatsRequestDto = {
  endAt: Scalars['DateTime'];
  startAt: Scalars['DateTime'];
};

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', disableUser: { __typename?: 'User', id: string, disabledAt?: any | null, isDisabled: boolean } };

export type UserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, fullName: string, joinedAt: any, disabledAt?: any | null, isDisabled: boolean, avatar?: string | null, connections: Array<{ __typename?: 'Connection', id: string, isDisabled?: boolean | null, createdAt: any, emailAddress: string, isActivated: boolean, status: StatusEnum, isSyncing: boolean }>, notificationSettings: { __typename?: 'NotificationUserSettings', id: string, email: string }, optOutAddresses: Array<{ __typename?: 'OptOutAddress', id: string, emailAddress: string, createdAt: any, deletedAt?: any | null }> } };

export type RemoveConnectionMutationVariables = Exact<{
  input: ConnectionUnlinkInput;
}>;


export type RemoveConnectionMutation = { __typename?: 'Mutation', connectionUnlink: { __typename?: 'Connection', id: string, isDisabled?: boolean | null } };

export type ActivateConnectionMutationVariables = Exact<{
  input: ConnectionActivateInput;
}>;


export type ActivateConnectionMutation = { __typename?: 'Mutation', connectionActivate: { __typename?: 'Connection', id: string, isActivated: boolean } };

export type DeactivateConnectionMutationVariables = Exact<{
  input: ConnectionDeactivateInput;
}>;


export type DeactivateConnectionMutation = { __typename?: 'Mutation', connectionDeactivate: { __typename?: 'Connection', id: string, isActivated: boolean } };

export type MessagesQueryVariables = Exact<{
  input: MessagesInput;
}>;


export type MessagesQuery = { __typename?: 'Query', messages: { __typename?: 'MessagesCollection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, totalResults: number, endCursor?: string | null }, edges: Array<{ __typename?: 'MessageEdge', cursor: string, node: { __typename?: 'Message', id: string, type: MessageTypeEnum, receivedAt: any, to: Array<{ __typename?: 'MessageParticipant', displayName?: string | null, emailAddress: string }>, from: { __typename?: 'MessageParticipant', displayName?: string | null, emailAddress: string }, decision?: { __typename?: 'Decision', id: string, decidedAt: any, ruling: RuleEnum, verdict: VerdictEnum } | null, challenge?: { __typename?: 'Challenge', id: string, hasExpected: boolean, hasDonation: boolean } | null } }> } };

export type MessageQueryVariables = Exact<{
  messageId: Scalars['ID'];
}>;


export type MessageQuery = { __typename?: 'Query', message: { __typename?: 'Message', id: string, type: MessageTypeEnum, receivedAt: any, to: Array<{ __typename?: 'MessageParticipant', displayName?: string | null, emailAddress: string }>, from: { __typename?: 'MessageParticipant', displayName?: string | null, emailAddress: string }, cc: Array<{ __typename?: 'MessageParticipant', displayName?: string | null, emailAddress: string }>, bcc: Array<{ __typename?: 'MessageParticipant', displayName?: string | null, emailAddress: string }>, decision?: { __typename?: 'Decision', id: string, decidedAt: any, ruling: RuleEnum, verdict: VerdictEnum, enforcedTraining?: { __typename?: 'Training', versionId?: string | null, origin?: TrainingOriginEnum | null, createdAt: any, domain: string, username?: string | null } | null, enforcedOptOutAddress?: { __typename?: 'OptOutAddress', id: string, createdAt: any, emailAddress: string, deletedAt?: any | null } | null, enforcedPattern?: { __typename?: 'Pattern', id: string, deletedAt?: any | null, createdAt: any, expression: string } | null, challenge?: { __typename?: 'Challenge', id: string, createdAt: any, mode: ChallengeModeEnum, hasDonation: boolean, hasExpected: boolean, withholdReason?: ChallengeWitholdReasonEnum | null, body: string, nonprofit: { __typename?: 'Nonprofit', id: string, name: string }, sentMessage: { __typename?: 'Message', id: string, createdAt?: any | null, thread?: { __typename?: 'Thread', id: string } | null }, interactions: { __typename?: 'ChallengeInteractionsConnection', edges: Array<{ __typename?: 'ChallengeInteractionEdge', node: { __typename?: 'ChallengeInteraction', id: string, paymentAmount?: number | null, performedAt: any, interaction: ChallengeInteractionEnum } }> } } | null } | null } };

export type AdminNotificationUserSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminNotificationUserSettingsQuery = { __typename?: 'Query', notificationUserSettings: { __typename?: 'NotificationUserSettings', id: string, email: string, disableTxEmail?: Array<TransactionEnum> | null } };

export type AdminUpdateNotificationUserSettingsMutationVariables = Exact<{
  input: NotificationUserSettingsUpdateAdminInput;
}>;


export type AdminUpdateNotificationUserSettingsMutation = { __typename?: 'Mutation', notificationUserSettingsAdminUpdate: { __typename?: 'NotificationUserSettings', email: string, disableTxEmail?: Array<TransactionEnum> | null, id: string } };

export type AddOptOutAddressMutationVariables = Exact<{
  input: OptOutAddressAddInput;
}>;


export type AddOptOutAddressMutation = { __typename?: 'Mutation', optOutAddressAdd: { __typename?: 'OptOutAddress', id: string, emailAddress: string, createdAt: any } };

export type RemoveOptOutAddressMutationVariables = Exact<{
  input: OptOutAddressRemoveInput;
}>;


export type RemoveOptOutAddressMutation = { __typename?: 'Mutation', optOutAddressRemove: boolean };

export type DeletedOptOutAddressFragment = { __typename?: 'OptOutAddress', deletedAt?: any | null };

export type NewOptOutAddressFragment = { __typename?: 'OptOutAddress', id: string, emailAddress: string, createdAt: any };

export type UsersQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type UsersQuery = { __typename?: 'Query', userSearch: { __typename?: 'UserSearchResponse', results: Array<{ __typename?: 'User', id: string, avatar?: string | null, fullName: string, joinedAt: any, isDisabled: boolean }> } };

export type SenderDonateMutationVariables = Exact<{
  input: ChallengeSenderDonateInput;
}>;


export type SenderDonateMutation = { __typename?: 'Mutation', challengeSenderDonate: boolean };

export type PaymentChargeMutationVariables = Exact<{
  input: PaymentChargeInput;
}>;


export type PaymentChargeMutation = { __typename?: 'Mutation', paymentCharge: boolean };

export type ChallengeMarkExpectedMutationVariables = Exact<{
  input: ChallengeMarkExpectedInput;
}>;


export type ChallengeMarkExpectedMutation = { __typename?: 'Mutation', challengeMarkExpected: boolean };

export type LinkedAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type LinkedAccountsQuery = { __typename?: 'Query', me: { __typename?: 'User', connections: Array<{ __typename?: 'Connection', id: string, status: StatusEnum, isSyncing: boolean, emailAddress: string }> } };

export type RemoveAccountMutationVariables = Exact<{
  connectionId: Scalars['String'];
  reason: Scalars['String'];
  experience: Scalars['String'];
}>;


export type RemoveAccountMutation = { __typename?: 'Mutation', connectionUnlink: { __typename?: 'Connection', id: string } };

export type ChallengeUserSettingFieldsFragment = { __typename?: 'ChallengeUserSetting', id: string, signature: string, minimumDonation: number, nonprofit: { __typename?: 'Nonprofit', id: string, slug?: string | null, description: string, name: string, isFeatured?: boolean | null, category: { __typename?: 'NonprofitCategory', id: string, name: string } } };

export type UserChallengeSettingsMutationVariables = Exact<{
  input: ChallengeUserSettingsUpdateInput;
}>;


export type UserChallengeSettingsMutation = { __typename?: 'Mutation', challengeUserSettingsUpdate: { __typename?: 'ChallengeUserSetting', id: string, signature: string, minimumDonation: number, nonprofit: { __typename?: 'Nonprofit', id: string, slug?: string | null, description: string, name: string, isFeatured?: boolean | null, category: { __typename?: 'NonprofitCategory', id: string, name: string } } } };

export type ChallengeSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChallengeSettingsQuery = { __typename?: 'Query', challengeSettings: { __typename?: 'ChallengeUserSetting', id: string, signature: string, minimumDonation: number, nonprofit: { __typename?: 'Nonprofit', id: string, slug?: string | null, description: string, name: string, isFeatured?: boolean | null, category: { __typename?: 'NonprofitCategory', id: string, name: string } } } };

export type NonprofitCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type NonprofitCategoriesQuery = { __typename?: 'Query', nonprofitCategories: { __typename?: 'NonprofitCategoriesResponse', nonprofitCategories: Array<{ __typename?: 'NonprofitCategory', id: string, name: string }> } };

export type NonprofitsQueryVariables = Exact<{
  input: NonprofitsInput;
}>;


export type NonprofitsQuery = { __typename?: 'Query', nonprofits: { __typename?: 'NonprofitsResponse', nonprofits: Array<{ __typename?: 'Nonprofit', id: string, description: string, name: string, isFeatured?: boolean | null, art?: string | null }> } };

export type ChallengeInteractionsQueryVariables = Exact<{
  input: ChallengeInteractionsInput;
}>;


export type ChallengeInteractionsQuery = { __typename?: 'Query', challengeInteractions: { __typename?: 'ChallengeInteractionsConnection', pageInfo: { __typename?: 'PageInfo', totalResults: number, hasNextPage: boolean }, edges: Array<{ __typename?: 'ChallengeInteractionEdge', cursor: string, node: { __typename?: 'ChallengeInteraction', id: string, interaction: ChallengeInteractionEnum, paymentAmount?: number | null, performedAt: any, challenge: { __typename?: 'Challenge', to: string, createdAt: any } } }> } };

export type NetworkConnectionsTileQueryVariables = Exact<{ [key: string]: never; }>;


export type NetworkConnectionsTileQuery = { __typename?: 'Query', networkConnections: { __typename?: 'NetworkConnectionsConnection', edges: Array<{ __typename?: 'NetworkConnectionEdge', node: { __typename?: 'NetworkConnection', id: string, avatar?: string | null, name: string, joinedAt: any } }> }, networkConnectionStats: { __typename?: 'NetworkConnectionStatsResponse', allKnown: number, metWithGated: number, usingGated: number } };

export type DonationTileQueryVariables = Exact<{ [key: string]: never; }>;


export type DonationTileQuery = { __typename?: 'Query', challengeStats: { __typename?: 'ChallengeStatsResponse', donationTotal: number, donationAllTimeHigh: number, challengesSent: number }, challengeInteractions: { __typename?: 'ChallengeInteractionsConnection', edges: Array<{ __typename?: 'ChallengeInteractionEdge', node: { __typename?: 'ChallengeInteraction', paymentAmount?: number | null, performedAt: any, challenge: { __typename?: 'Challenge', to: string } } }> } };

export type RecentDecisionsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentDecisionsQuery = { __typename?: 'Query', decisions: { __typename?: 'DecisionsCollection', edges: Array<{ __typename?: 'DecisionEdge', node: { __typename?: 'Decision', id: string, emailAddress: string, decidedAt: any, ruling: RuleEnum } }> } };

export type AllowListAddressReviewQueryVariables = Exact<{
  connectionId: Scalars['ID'];
}>;


export type AllowListAddressReviewQuery = { __typename?: 'Query', previewAllowed: { __typename?: 'PreviewAllowedResponse', results: Array<{ __typename?: 'PreviewAllowedSender', id: string, sender: { __typename?: 'MessageParticipant', emailAddress: string, displayName?: string | null } }> } };

export type AllowListDomainReviewQueryVariables = Exact<{ [key: string]: never; }>;


export type AllowListDomainReviewQuery = { __typename?: 'Query', trainingSearch: { __typename?: 'TrainingsConnection', edges: Array<{ __typename?: 'TrainingEdge', cursor: string, node: { __typename?: 'Training', id: string, domain: string } }> } };

export type OnboardingDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type OnboardingDetailsQuery = { __typename?: 'Query', userTasks: Array<{ __typename?: 'UserTask', id: string, task: UserTaskEnum, resolution?: UserTaskResolutionEnum | null }> };

export type MarkOnboardingTaskCompleteMutationVariables = Exact<{
  input: UserTaskResolvedInput;
}>;


export type MarkOnboardingTaskCompleteMutation = { __typename?: 'Mutation', userTaskResolved: { __typename?: 'UserTask', id: string, resolution?: UserTaskResolutionEnum | null } };

export type ConnectionsStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type ConnectionsStatusQuery = { __typename?: 'Query', me: { __typename?: 'User', connections: Array<{ __typename?: 'Connection', id: string, status: StatusEnum }> } };

export type OnboardingConnectInboxQueryVariables = Exact<{ [key: string]: never; }>;


export type OnboardingConnectInboxQuery = { __typename?: 'Query', me: { __typename?: 'User', notificationSettings: { __typename?: 'NotificationUserSettings', email: string } } };

export type OffboardMutationVariables = Exact<{
  input: DeleteAccountRequest;
}>;


export type OffboardMutation = { __typename?: 'Mutation', offboard: { __typename?: 'User', id: string } };

export type NameAvatarQueryVariables = Exact<{ [key: string]: never; }>;


export type NameAvatarQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName: string, fullName: string, joinedAt: any, avatar?: string | null } };

export type UpdateProfileMutationVariables = Exact<{
  input: UserUpdateInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', userUpdate: { __typename?: 'User', id: string, avatar?: string | null, firstName: string, lastName: string, fullName: string } };

export type NotificationUserSettingsFieldsFragment = { __typename?: 'NotificationUserSettings', id: string, email: string, updatedAt: any };

export type UpdateNotificationUserSettingsMutationVariables = Exact<{
  input: NotificationUserSettingsUpdateInput;
}>;


export type UpdateNotificationUserSettingsMutation = { __typename?: 'Mutation', notificationUserSettingsUpdate: { __typename?: 'NotificationUserSettings', id: string, email: string, updatedAt: any } };

export type NotificationUserSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationUserSettingsQuery = { __typename?: 'Query', notificationUserSettings: { __typename?: 'NotificationUserSettings', id: string, email: string, updatedAt: any } };

export type ConnectionFieldFragment = { __typename?: 'Connection', id: string, isActivated: boolean, isSyncing: boolean, emailAddress: string, status: StatusEnum, provider: ProviderEnum, createdAt: any };

export type QueryConnectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryConnectionsQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, connections: Array<{ __typename?: 'Connection', id: string, isActivated: boolean, isSyncing: boolean, emailAddress: string, status: StatusEnum, provider: ProviderEnum, createdAt: any }> } };

export type MutationActivateConnectionMutationVariables = Exact<{
  input: ConnectionActivateInput;
}>;


export type MutationActivateConnectionMutation = { __typename?: 'Mutation', connectionActivate: { __typename?: 'Connection', id: string, isActivated: boolean, isSyncing: boolean, emailAddress: string, status: StatusEnum, provider: ProviderEnum, createdAt: any } };

export type MutationDeactivateConnectionMutationVariables = Exact<{
  input: ConnectionDeactivateInput;
}>;


export type MutationDeactivateConnectionMutation = { __typename?: 'Mutation', connectionDeactivate: { __typename?: 'Connection', id: string, isActivated: boolean, isSyncing: boolean, emailAddress: string, status: StatusEnum, provider: ProviderEnum, createdAt: any } };

export type MutationUnlinkConnectionMutationVariables = Exact<{
  input: ConnectionUnlinkInput;
}>;


export type MutationUnlinkConnectionMutation = { __typename?: 'Mutation', connectionUnlink: { __typename?: 'Connection', id: string } };

export type QueryDecisionTestQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type QueryDecisionTestQuery = { __typename?: 'Query', decisionTest: { __typename?: 'GatekeeperTestQueryResponse', ruling: RuleEnum, verdict: VerdictEnum, enforcedPattern?: { __typename?: 'Pattern', id: string, expression: string } | null, enforcedTraining?: { __typename?: 'Training', id: string, domain: string, username?: string | null, createdAt: any, origin?: TrainingOriginEnum | null, inheritedRule?: RuleEnum | null } | null } };

export type DecisionFieldsFragment = { __typename?: 'Decision', id: string, decidedAt: any, emailAddress: string, verdict: VerdictEnum, ruling: RuleEnum, connection: { __typename?: 'Connection', id: string, emailAddress: string }, challenge?: { __typename?: 'Challenge', id: string, hasExpected: boolean, hasDonation: boolean, interactions: { __typename?: 'ChallengeInteractionsConnection', edges: Array<{ __typename?: 'ChallengeInteractionEdge', node: { __typename?: 'ChallengeInteraction', paymentAmount?: number | null, performedAt: any } }> } } | null };

export type QueryDecisionsQueryVariables = Exact<{
  input: DecisionsInput;
}>;


export type QueryDecisionsQuery = { __typename?: 'Query', decisions: { __typename?: 'DecisionsCollection', pageInfo: { __typename?: 'PageInfo', totalResults: number, hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'DecisionEdge', cursor: string, node: { __typename?: 'Decision', id: string, decidedAt: any, emailAddress: string, verdict: VerdictEnum, ruling: RuleEnum, connection: { __typename?: 'Connection', id: string, emailAddress: string }, challenge?: { __typename?: 'Challenge', id: string, hasExpected: boolean, hasDonation: boolean, interactions: { __typename?: 'ChallengeInteractionsConnection', edges: Array<{ __typename?: 'ChallengeInteractionEdge', node: { __typename?: 'ChallengeInteraction', paymentAmount?: number | null, performedAt: any } }> } } | null } }> } };

export type QueryDecisionQueryVariables = Exact<{
  decisionId: Scalars['ID'];
}>;


export type QueryDecisionQuery = { __typename?: 'Query', decision: { __typename?: 'Decision', id: string, decidedAt: any, emailAddress: string, verdict: VerdictEnum, ruling: RuleEnum, connection: { __typename?: 'Connection', id: string, emailAddress: string }, challenge?: { __typename?: 'Challenge', id: string, hasExpected: boolean, hasDonation: boolean, interactions: { __typename?: 'ChallengeInteractionsConnection', edges: Array<{ __typename?: 'ChallengeInteractionEdge', node: { __typename?: 'ChallengeInteraction', paymentAmount?: number | null, performedAt: any } }> } } | null } };

export type QueryDonationTotalFromSenderQueryVariables = Exact<{
  input: DonationTotalFromSenderQueryInput;
}>;


export type QueryDonationTotalFromSenderQuery = { __typename?: 'Query', donationTotalFromSender: { __typename?: 'DonationTotalFromSenderQueryResponse', donationsCount: number, totalAmountInCents: number } };

export type QueryDonationsQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type QueryDonationsQuery = { __typename?: 'Query', challengeInteractions: { __typename?: 'ChallengeInteractionsConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null, totalResults: number }, edges: Array<{ __typename?: 'ChallengeInteractionEdge', cursor: string, node: { __typename?: 'ChallengeInteraction', id: string, performedAt: any, paymentAmount?: number | null, challenge: { __typename?: 'Challenge', id: string, to: string } } }> } };

export type QueryDonationStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryDonationStatsQuery = { __typename?: 'Query', challengeStats: { __typename?: 'ChallengeStatsResponse', donationTotal: number, donationCount: number } };

export type VolumeStatFieldsFragment = { __typename?: 'VolumeStat', id: string, gatedMessages: number, receivedMessages: number };

export type GatedStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GatedStatsQuery = { __typename?: 'Query', stats: { __typename?: 'StatsResponse', lastThirtyDays: { __typename?: 'Stats', totalCount: number, gatedCount: number }, previousThirtyDays: { __typename?: 'Stats', totalCount: number, gatedCount: number } } };

export type NonprofitFieldsFragment = { __typename?: 'Nonprofit', id: string, description: string, name: string, logo?: string | null, isFeatured?: boolean | null, category: { __typename?: 'NonprofitCategory', id: string, name: string } };

export type NonprofitCategoryFieldsFragment = { __typename?: 'NonprofitCategory', id: string, name: string };

export type QueryNonprofitCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryNonprofitCategoriesQuery = { __typename?: 'Query', nonprofitCategories: { __typename?: 'NonprofitCategoriesResponse', nonprofitCategories: Array<{ __typename?: 'NonprofitCategory', id: string, name: string }> } };

export type QueryNonprofitsQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryNonprofitsQuery = { __typename?: 'Query', nonprofits: { __typename?: 'NonprofitsResponse', nonprofits: Array<{ __typename?: 'Nonprofit', id: string, description: string, name: string, logo?: string | null, isFeatured?: boolean | null, category: { __typename?: 'NonprofitCategory', id: string, name: string } }> } };

export type QueryNonprofitQueryVariables = Exact<{
  nonprofitId: Scalars['ID'];
}>;


export type QueryNonprofitQuery = { __typename?: 'Query', nonprofit: { __typename?: 'Nonprofit', id: string, description: string, name: string, logo?: string | null, isFeatured?: boolean | null, category: { __typename?: 'NonprofitCategory', id: string, name: string } } };

export type QueryNonprofitDefaultQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryNonprofitDefaultQuery = { __typename?: 'Query', nonprofitDefault: { __typename?: 'Nonprofit', id: string, description: string, name: string, logo?: string | null, isFeatured?: boolean | null, category: { __typename?: 'NonprofitCategory', id: string, name: string } } };

export type SentReceivedStatFieldsFragment = { __typename?: 'SentReceivedStat', id: string, domain: string, username?: string | null, firstSeenAt?: any | null, lastSeenAt?: any | null, receivedCount: number, sentCount: number, training?: { __typename?: 'Training', id: string, rule?: RuleEnum | null, origin?: TrainingOriginEnum | null, inheritedRule?: RuleEnum | null } | null };

export type QuerySentReceivedStatQueryVariables = Exact<{
  input: SentReceivedStatQueryInput;
}>;


export type QuerySentReceivedStatQuery = { __typename?: 'Query', sentReceivedStat: { __typename?: 'SentReceivedStat', id: string, domain: string, username?: string | null, firstSeenAt?: any | null, lastSeenAt?: any | null, receivedCount: number, sentCount: number, training?: { __typename?: 'Training', id: string, rule?: RuleEnum | null, origin?: TrainingOriginEnum | null, inheritedRule?: RuleEnum | null } | null } };

export type QuerySentReceivedStatsQueryVariables = Exact<{
  input: SentReceivedStatsInput;
}>;


export type QuerySentReceivedStatsQuery = { __typename?: 'Query', sentReceivedStats: { __typename?: 'SentReceivedStatsConnection', pageInfo: { __typename?: 'PageInfo', totalResults: number, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'SentReceivedStatsEdge', cursor: string, node: { __typename?: 'SentReceivedStat', id: string, domain: string, username?: string | null, firstSeenAt?: any | null, lastSeenAt?: any | null, receivedCount: number, sentCount: number, training?: { __typename?: 'Training', id: string, rule?: RuleEnum | null, origin?: TrainingOriginEnum | null, inheritedRule?: RuleEnum | null } | null } }> } };

export type TrainingFieldsFragment = { __typename?: 'Training', id: string, origin?: TrainingOriginEnum | null, rule?: RuleEnum | null, domain: string, username?: string | null, createdAt: any, inheritedRule?: RuleEnum | null };

export type TrainAddressMutationVariables = Exact<{
  address: Scalars['String'];
  rule: RuleEnum;
}>;


export type TrainAddressMutation = { __typename?: 'Mutation', trainAddress: { __typename?: 'Training', id: string, origin?: TrainingOriginEnum | null, rule?: RuleEnum | null, domain: string, username?: string | null, createdAt: any, inheritedRule?: RuleEnum | null } };

export type TrainDomainMutationVariables = Exact<{
  domain: Scalars['String'];
  rule: RuleEnum;
}>;


export type TrainDomainMutation = { __typename?: 'Mutation', trainDomain: { __typename?: 'Training', id: string, origin?: TrainingOriginEnum | null, rule?: RuleEnum | null, domain: string, username?: string | null, createdAt: any, inheritedRule?: RuleEnum | null } };

export type SearchTrainingsQueryVariables = Exact<{
  input: TrainingsSearchInput;
}>;


export type SearchTrainingsQuery = { __typename?: 'Query', trainingSearch: { __typename?: 'TrainingsConnection', pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, totalResults: number }, edges: Array<{ __typename?: 'TrainingEdge', cursor: string, node: { __typename?: 'Training', id: string, origin?: TrainingOriginEnum | null, rule?: RuleEnum | null, domain: string, username?: string | null, createdAt: any, inheritedRule?: RuleEnum | null } }> } };

export type CheckHandleQueryVariables = Exact<{
  input: UserHandleAvailableQueryInput;
}>;


export type CheckHandleQuery = { __typename?: 'Query', userHandleAvailable: boolean };

export type HandleMutationVariables = Exact<{
  input: UserHandleInput;
}>;


export type HandleMutation = { __typename?: 'Mutation', userHandle: { __typename?: 'User', id: string, handle?: string | null } };

export type DonationsQueryVariables = Exact<{
  input: DonationsInput;
}>;


export type DonationsQuery = { __typename?: 'Query', donations: { __typename?: 'DonationsConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, totalResults: number, endCursor?: string | null }, edges: Array<{ __typename?: 'DonationEdge', cursor: string, node: { __typename?: 'DonationRequestInteraction', amountInCents?: number | null, note?: string | null, id: string, performedAt: any, request: { __typename?: 'DonationRequest', type: DonationRequestTypeEnum, id: string, memo?: string | null, name?: string | null } } }> } };

export type DonationRequestStatsQueryVariables = Exact<{
  input: DonationRequestStatsInput;
}>;


export type DonationRequestStatsQuery = { __typename?: 'Query', donationRequestStats: { __typename?: 'DonationRequestStatsResponse', donationCount: number, donationTotal: number, viewCount: number } };

export type PageDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PageDetailsQuery = { __typename?: 'Query', donationRequest: { __typename?: 'DonationRequest', id: string, name?: string | null, amountInCents: number, isFeatured?: boolean | null, createdAt: any, cta?: string | null, thankYouMessage?: string | null, memo?: string | null, stats: { __typename?: 'DonationRequestStatsResponse', viewCount: number, donationTotal: number, donationCount: number } } };

export type DonationDetailsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DonationDetailsQuery = { __typename?: 'Query', donation: { __typename?: 'DonationRequestInteraction', amountInCents?: number | null, note?: string | null, id: string, performedAt: any } };

export type DonationRequestQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DonationRequestQuery = { __typename?: 'Query', donationRequest: { __typename?: 'DonationRequest', id: string, amountInCents: number, createdAt: any, memo?: string | null, isActive: boolean, type: DonationRequestTypeEnum, isFeatured?: boolean | null, name?: string | null, lastDonatedAt?: any | null, nonprofit: { __typename?: 'Nonprofit', id: string, name: string } } };

export type AddPushTokenMutationVariables = Exact<{
  input: NotificationAddPushTokenInput;
}>;


export type AddPushTokenMutation = { __typename?: 'Mutation', notificationAddPushToken: boolean };

export type AcknowledgeNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type AcknowledgeNotificationsMutation = { __typename?: 'Mutation', notificationsAcknowledge: boolean };

export type CreateDonationRequestMutationVariables = Exact<{
  input: DonationRequestInput;
}>;


export type CreateDonationRequestMutation = { __typename?: 'Mutation', donationRequest: { __typename?: 'DonationRequest', id: string, amountInCents: number, createdAt: any, memo?: string | null, isFeatured?: boolean | null, cta?: string | null, isActive: boolean, type: DonationRequestTypeEnum, name?: string | null } };

export type DonationRequestsQueryVariables = Exact<{
  input: DonationRequestsInput;
}>;


export type DonationRequestsQuery = { __typename?: 'Query', donationRequests: { __typename?: 'DonationRequestsConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, totalResults: number, endCursor?: string | null, startCursor?: string | null }, edges: Array<{ __typename?: 'DonationRequestEdge', cursor: string, node: { __typename?: 'DonationRequest', id: string, amountInCents: number, createdAt: any, memo?: string | null, isFeatured?: boolean | null, cta?: string | null, isActive: boolean, type: DonationRequestTypeEnum, name?: string | null, stats: { __typename?: 'DonationRequestStatsResponse', donationCount: number, donationTotal: number, viewCount: number } } }> } };

export type SignupActivateQueryVariables = Exact<{ [key: string]: never; }>;


export type SignupActivateQuery = { __typename?: 'Query', me: { __typename?: 'User', isSignupCompleted: boolean } };

export type SignupSuccessQueryVariables = Exact<{ [key: string]: never; }>;


export type SignupSuccessQuery = { __typename?: 'Query', me: { __typename?: 'User', notificationSettings: { __typename?: 'NotificationUserSettings', email: string } } };

export type PersonalizationFragment = { __typename?: 'User', personalization: { __typename?: 'UserPersonalization', userBenefitSelection: { __typename?: 'UserBenefitSelection', userBenefit: UserBenefitEnum, benefitLabel: string, otherText: string } } };

export type UpdatePersonalizationMutationVariables = Exact<{
  input: UserPersonalizationUpdateInput;
}>;


export type UpdatePersonalizationMutation = { __typename?: 'Mutation', userUpdatePersonalization: { __typename?: 'User', personalization: { __typename?: 'UserPersonalization', userBenefitSelection: { __typename?: 'UserBenefitSelection', userBenefit: UserBenefitEnum, benefitLabel: string, otherText: string } } } };

export type ServiceProviderLookupQueryVariables = Exact<{
  input: EmailProviderIsGoogleRequestDto;
}>;


export type ServiceProviderLookupQuery = { __typename?: 'Query', providerFromAddress: { __typename?: 'EmailProviderIsGoogleResponseDto', emailAddress: string, isGoogle: boolean } };

export type DonateMutationVariables = Exact<{
  input: DonateInput;
}>;


export type DonateMutation = { __typename?: 'Mutation', donate: { __typename?: 'DonateResponse', thankYouMessage?: string | null, donatedInteraction: { __typename?: 'DonationRequestInteraction', id: string } } };

export type MeUserContextQueryVariables = Exact<{ [key: string]: never; }>;


export type MeUserContextQuery = { __typename?: 'Query', challengeSettings: { __typename?: 'ChallengeUserSetting', id: string, nonprofit: { __typename?: 'Nonprofit', name: string, id: string, slug?: string | null } }, me: { __typename?: 'User', firstName: string, lastName: string, fullName: string, handle?: string | null, referralCode?: string | null, id: string, avatar?: string | null, joinedAt: any, notificationSettings: { __typename?: 'NotificationUserSettings', email: string } } };

export const DeletedOptOutAddressFragmentDoc = gql`
    fragment DeletedOptOutAddress on OptOutAddress {
  deletedAt
}
    `;
export const NewOptOutAddressFragmentDoc = gql`
    fragment NewOptOutAddress on OptOutAddress {
  id
  emailAddress
  createdAt
}
    `;
export const ChallengeUserSettingFieldsFragmentDoc = gql`
    fragment ChallengeUserSettingFields on ChallengeUserSetting {
  id
  signature
  minimumDonation
  nonprofit {
    id
    slug
    category {
      id
      name
    }
    description
    name
    isFeatured
  }
}
    `;
export const NotificationUserSettingsFieldsFragmentDoc = gql`
    fragment NotificationUserSettingsFields on NotificationUserSettings {
  id
  email
  updatedAt
}
    `;
export const ConnectionFieldFragmentDoc = gql`
    fragment ConnectionField on Connection {
  id
  isActivated
  isSyncing
  emailAddress
  status
  provider
  createdAt
}
    `;
export const DecisionFieldsFragmentDoc = gql`
    fragment DecisionFields on Decision {
  id
  decidedAt
  emailAddress
  verdict
  ruling
  connection {
    id
    emailAddress
  }
  challenge {
    id
    hasExpected
    hasDonation
    interactions(input: {interaction: Donated}) {
      edges {
        node {
          paymentAmount
          performedAt
        }
      }
    }
  }
}
    `;
export const VolumeStatFieldsFragmentDoc = gql`
    fragment VolumeStatFields on VolumeStat {
  id
  gatedMessages
  receivedMessages
}
    `;
export const NonprofitFieldsFragmentDoc = gql`
    fragment NonprofitFields on Nonprofit {
  id
  category {
    id
    name
  }
  description
  name
  logo
  isFeatured
}
    `;
export const NonprofitCategoryFieldsFragmentDoc = gql`
    fragment NonprofitCategoryFields on NonprofitCategory {
  id
  name
}
    `;
export const SentReceivedStatFieldsFragmentDoc = gql`
    fragment SentReceivedStatFields on SentReceivedStat {
  id
  domain
  username
  firstSeenAt
  lastSeenAt
  receivedCount
  sentCount
  training {
    id
    rule
    origin
    inheritedRule
  }
}
    `;
export const TrainingFieldsFragmentDoc = gql`
    fragment TrainingFields on Training {
  id
  origin
  rule
  domain
  username
  createdAt
  inheritedRule
}
    `;
export const PersonalizationFragmentDoc = gql`
    fragment Personalization on User {
  personalization {
    userBenefitSelection {
      userBenefit
      benefitLabel
      otherText
    }
  }
}
    `;
export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: String!) {
  disableUser(userId: $userId) {
    id
    disabledAt
    isDisabled
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UserDocument = gql`
    query User($userId: ID!) {
  user(id: $userId) {
    connections {
      id
      isDisabled
      createdAt
      emailAddress
      isActivated
      status
      isSyncing
    }
    id
    fullName
    joinedAt
    disabledAt
    isDisabled
    avatar
    notificationSettings {
      id
      email
    }
    optOutAddresses {
      id
      emailAddress
      createdAt
      deletedAt
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const RemoveConnectionDocument = gql`
    mutation RemoveConnection($input: ConnectionUnlinkInput!) {
  connectionUnlink(input: $input) {
    id
    isDisabled
  }
}
    `;
export type RemoveConnectionMutationFn = Apollo.MutationFunction<RemoveConnectionMutation, RemoveConnectionMutationVariables>;

/**
 * __useRemoveConnectionMutation__
 *
 * To run a mutation, you first call `useRemoveConnectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveConnectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeConnectionMutation, { data, loading, error }] = useRemoveConnectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveConnectionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveConnectionMutation, RemoveConnectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveConnectionMutation, RemoveConnectionMutationVariables>(RemoveConnectionDocument, options);
      }
export type RemoveConnectionMutationHookResult = ReturnType<typeof useRemoveConnectionMutation>;
export type RemoveConnectionMutationResult = Apollo.MutationResult<RemoveConnectionMutation>;
export type RemoveConnectionMutationOptions = Apollo.BaseMutationOptions<RemoveConnectionMutation, RemoveConnectionMutationVariables>;
export const ActivateConnectionDocument = gql`
    mutation ActivateConnection($input: ConnectionActivateInput!) {
  connectionActivate(input: $input) {
    id
    isActivated
  }
}
    `;
export type ActivateConnectionMutationFn = Apollo.MutationFunction<ActivateConnectionMutation, ActivateConnectionMutationVariables>;

/**
 * __useActivateConnectionMutation__
 *
 * To run a mutation, you first call `useActivateConnectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateConnectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateConnectionMutation, { data, loading, error }] = useActivateConnectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivateConnectionMutation(baseOptions?: Apollo.MutationHookOptions<ActivateConnectionMutation, ActivateConnectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateConnectionMutation, ActivateConnectionMutationVariables>(ActivateConnectionDocument, options);
      }
export type ActivateConnectionMutationHookResult = ReturnType<typeof useActivateConnectionMutation>;
export type ActivateConnectionMutationResult = Apollo.MutationResult<ActivateConnectionMutation>;
export type ActivateConnectionMutationOptions = Apollo.BaseMutationOptions<ActivateConnectionMutation, ActivateConnectionMutationVariables>;
export const DeactivateConnectionDocument = gql`
    mutation DeactivateConnection($input: ConnectionDeactivateInput!) {
  connectionDeactivate(input: $input) {
    id
    isActivated
  }
}
    `;
export type DeactivateConnectionMutationFn = Apollo.MutationFunction<DeactivateConnectionMutation, DeactivateConnectionMutationVariables>;

/**
 * __useDeactivateConnectionMutation__
 *
 * To run a mutation, you first call `useDeactivateConnectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateConnectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateConnectionMutation, { data, loading, error }] = useDeactivateConnectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeactivateConnectionMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateConnectionMutation, DeactivateConnectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivateConnectionMutation, DeactivateConnectionMutationVariables>(DeactivateConnectionDocument, options);
      }
export type DeactivateConnectionMutationHookResult = ReturnType<typeof useDeactivateConnectionMutation>;
export type DeactivateConnectionMutationResult = Apollo.MutationResult<DeactivateConnectionMutation>;
export type DeactivateConnectionMutationOptions = Apollo.BaseMutationOptions<DeactivateConnectionMutation, DeactivateConnectionMutationVariables>;
export const MessagesDocument = gql`
    query Messages($input: MessagesInput!) {
  messages(input: $input) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      totalResults
      endCursor
    }
    edges {
      cursor
      node {
        id
        type
        to {
          displayName
          emailAddress
        }
        from {
          displayName
          emailAddress
        }
        receivedAt
        decision {
          id
          decidedAt
          ruling
          verdict
        }
        challenge {
          id
          hasExpected
          hasDonation
        }
      }
    }
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const MessageDocument = gql`
    query Message($messageId: ID!) {
  message(id: $messageId) {
    id
    type
    to {
      displayName
      emailAddress
    }
    from {
      displayName
      emailAddress
    }
    cc {
      displayName
      emailAddress
    }
    bcc {
      displayName
      emailAddress
    }
    receivedAt
    decision {
      id
      decidedAt
      ruling
      verdict
      enforcedTraining {
        versionId
        origin
        createdAt
        domain
        username
      }
      enforcedOptOutAddress {
        id
        createdAt
        emailAddress
        deletedAt
      }
      enforcedPattern {
        id
        deletedAt
        createdAt
        expression
      }
      challenge {
        id
        createdAt
        nonprofit {
          id
          name
        }
        sentMessage {
          id
          createdAt
          thread {
            id
          }
        }
        interactions(input: {}) {
          edges {
            node {
              id
              paymentAmount
              performedAt
              interaction
            }
          }
        }
        mode
        hasDonation
        hasExpected
        withholdReason
        body
      }
    }
  }
}
    `;

/**
 * __useMessageQuery__
 *
 * To run a query within a React component, call `useMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageQuery({
 *   variables: {
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useMessageQuery(baseOptions: Apollo.QueryHookOptions<MessageQuery, MessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessageQuery, MessageQueryVariables>(MessageDocument, options);
      }
export function useMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessageQuery, MessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessageQuery, MessageQueryVariables>(MessageDocument, options);
        }
export type MessageQueryHookResult = ReturnType<typeof useMessageQuery>;
export type MessageLazyQueryHookResult = ReturnType<typeof useMessageLazyQuery>;
export type MessageQueryResult = Apollo.QueryResult<MessageQuery, MessageQueryVariables>;
export const AdminNotificationUserSettingsDocument = gql`
    query AdminNotificationUserSettings {
  notificationUserSettings {
    id
    email
    disableTxEmail
  }
}
    `;

/**
 * __useAdminNotificationUserSettingsQuery__
 *
 * To run a query within a React component, call `useAdminNotificationUserSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminNotificationUserSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminNotificationUserSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminNotificationUserSettingsQuery(baseOptions?: Apollo.QueryHookOptions<AdminNotificationUserSettingsQuery, AdminNotificationUserSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminNotificationUserSettingsQuery, AdminNotificationUserSettingsQueryVariables>(AdminNotificationUserSettingsDocument, options);
      }
export function useAdminNotificationUserSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminNotificationUserSettingsQuery, AdminNotificationUserSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminNotificationUserSettingsQuery, AdminNotificationUserSettingsQueryVariables>(AdminNotificationUserSettingsDocument, options);
        }
export type AdminNotificationUserSettingsQueryHookResult = ReturnType<typeof useAdminNotificationUserSettingsQuery>;
export type AdminNotificationUserSettingsLazyQueryHookResult = ReturnType<typeof useAdminNotificationUserSettingsLazyQuery>;
export type AdminNotificationUserSettingsQueryResult = Apollo.QueryResult<AdminNotificationUserSettingsQuery, AdminNotificationUserSettingsQueryVariables>;
export const AdminUpdateNotificationUserSettingsDocument = gql`
    mutation AdminUpdateNotificationUserSettings($input: NotificationUserSettingsUpdateAdminInput!) {
  notificationUserSettingsAdminUpdate(input: $input) {
    email
    disableTxEmail
    id
  }
}
    `;
export type AdminUpdateNotificationUserSettingsMutationFn = Apollo.MutationFunction<AdminUpdateNotificationUserSettingsMutation, AdminUpdateNotificationUserSettingsMutationVariables>;

/**
 * __useAdminUpdateNotificationUserSettingsMutation__
 *
 * To run a mutation, you first call `useAdminUpdateNotificationUserSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateNotificationUserSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateNotificationUserSettingsMutation, { data, loading, error }] = useAdminUpdateNotificationUserSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateNotificationUserSettingsMutation(baseOptions?: Apollo.MutationHookOptions<AdminUpdateNotificationUserSettingsMutation, AdminUpdateNotificationUserSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminUpdateNotificationUserSettingsMutation, AdminUpdateNotificationUserSettingsMutationVariables>(AdminUpdateNotificationUserSettingsDocument, options);
      }
export type AdminUpdateNotificationUserSettingsMutationHookResult = ReturnType<typeof useAdminUpdateNotificationUserSettingsMutation>;
export type AdminUpdateNotificationUserSettingsMutationResult = Apollo.MutationResult<AdminUpdateNotificationUserSettingsMutation>;
export type AdminUpdateNotificationUserSettingsMutationOptions = Apollo.BaseMutationOptions<AdminUpdateNotificationUserSettingsMutation, AdminUpdateNotificationUserSettingsMutationVariables>;
export const AddOptOutAddressDocument = gql`
    mutation AddOptOutAddress($input: OptOutAddressAddInput!) {
  optOutAddressAdd(input: $input) {
    id
    emailAddress
    createdAt
  }
}
    `;
export type AddOptOutAddressMutationFn = Apollo.MutationFunction<AddOptOutAddressMutation, AddOptOutAddressMutationVariables>;

/**
 * __useAddOptOutAddressMutation__
 *
 * To run a mutation, you first call `useAddOptOutAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOptOutAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOptOutAddressMutation, { data, loading, error }] = useAddOptOutAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddOptOutAddressMutation(baseOptions?: Apollo.MutationHookOptions<AddOptOutAddressMutation, AddOptOutAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOptOutAddressMutation, AddOptOutAddressMutationVariables>(AddOptOutAddressDocument, options);
      }
export type AddOptOutAddressMutationHookResult = ReturnType<typeof useAddOptOutAddressMutation>;
export type AddOptOutAddressMutationResult = Apollo.MutationResult<AddOptOutAddressMutation>;
export type AddOptOutAddressMutationOptions = Apollo.BaseMutationOptions<AddOptOutAddressMutation, AddOptOutAddressMutationVariables>;
export const RemoveOptOutAddressDocument = gql`
    mutation RemoveOptOutAddress($input: OptOutAddressRemoveInput!) {
  optOutAddressRemove(input: $input)
}
    `;
export type RemoveOptOutAddressMutationFn = Apollo.MutationFunction<RemoveOptOutAddressMutation, RemoveOptOutAddressMutationVariables>;

/**
 * __useRemoveOptOutAddressMutation__
 *
 * To run a mutation, you first call `useRemoveOptOutAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveOptOutAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeOptOutAddressMutation, { data, loading, error }] = useRemoveOptOutAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveOptOutAddressMutation(baseOptions?: Apollo.MutationHookOptions<RemoveOptOutAddressMutation, RemoveOptOutAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveOptOutAddressMutation, RemoveOptOutAddressMutationVariables>(RemoveOptOutAddressDocument, options);
      }
export type RemoveOptOutAddressMutationHookResult = ReturnType<typeof useRemoveOptOutAddressMutation>;
export type RemoveOptOutAddressMutationResult = Apollo.MutationResult<RemoveOptOutAddressMutation>;
export type RemoveOptOutAddressMutationOptions = Apollo.BaseMutationOptions<RemoveOptOutAddressMutation, RemoveOptOutAddressMutationVariables>;
export const UsersDocument = gql`
    query Users($query: String!) {
  userSearch(query: $query) {
    results {
      id
      avatar
      fullName
      joinedAt
      isDisabled
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const SenderDonateDocument = gql`
    mutation SenderDonate($input: ChallengeSenderDonateInput!) {
  challengeSenderDonate(input: $input)
}
    `;
export type SenderDonateMutationFn = Apollo.MutationFunction<SenderDonateMutation, SenderDonateMutationVariables>;

/**
 * __useSenderDonateMutation__
 *
 * To run a mutation, you first call `useSenderDonateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSenderDonateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [senderDonateMutation, { data, loading, error }] = useSenderDonateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSenderDonateMutation(baseOptions?: Apollo.MutationHookOptions<SenderDonateMutation, SenderDonateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SenderDonateMutation, SenderDonateMutationVariables>(SenderDonateDocument, options);
      }
export type SenderDonateMutationHookResult = ReturnType<typeof useSenderDonateMutation>;
export type SenderDonateMutationResult = Apollo.MutationResult<SenderDonateMutation>;
export type SenderDonateMutationOptions = Apollo.BaseMutationOptions<SenderDonateMutation, SenderDonateMutationVariables>;
export const PaymentChargeDocument = gql`
    mutation PaymentCharge($input: PaymentChargeInput!) {
  paymentCharge(input: $input)
}
    `;
export type PaymentChargeMutationFn = Apollo.MutationFunction<PaymentChargeMutation, PaymentChargeMutationVariables>;

/**
 * __usePaymentChargeMutation__
 *
 * To run a mutation, you first call `usePaymentChargeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePaymentChargeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [paymentChargeMutation, { data, loading, error }] = usePaymentChargeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePaymentChargeMutation(baseOptions?: Apollo.MutationHookOptions<PaymentChargeMutation, PaymentChargeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PaymentChargeMutation, PaymentChargeMutationVariables>(PaymentChargeDocument, options);
      }
export type PaymentChargeMutationHookResult = ReturnType<typeof usePaymentChargeMutation>;
export type PaymentChargeMutationResult = Apollo.MutationResult<PaymentChargeMutation>;
export type PaymentChargeMutationOptions = Apollo.BaseMutationOptions<PaymentChargeMutation, PaymentChargeMutationVariables>;
export const ChallengeMarkExpectedDocument = gql`
    mutation ChallengeMarkExpected($input: ChallengeMarkExpectedInput!) {
  challengeMarkExpected(input: $input)
}
    `;
export type ChallengeMarkExpectedMutationFn = Apollo.MutationFunction<ChallengeMarkExpectedMutation, ChallengeMarkExpectedMutationVariables>;

/**
 * __useChallengeMarkExpectedMutation__
 *
 * To run a mutation, you first call `useChallengeMarkExpectedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChallengeMarkExpectedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [challengeMarkExpectedMutation, { data, loading, error }] = useChallengeMarkExpectedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChallengeMarkExpectedMutation(baseOptions?: Apollo.MutationHookOptions<ChallengeMarkExpectedMutation, ChallengeMarkExpectedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChallengeMarkExpectedMutation, ChallengeMarkExpectedMutationVariables>(ChallengeMarkExpectedDocument, options);
      }
export type ChallengeMarkExpectedMutationHookResult = ReturnType<typeof useChallengeMarkExpectedMutation>;
export type ChallengeMarkExpectedMutationResult = Apollo.MutationResult<ChallengeMarkExpectedMutation>;
export type ChallengeMarkExpectedMutationOptions = Apollo.BaseMutationOptions<ChallengeMarkExpectedMutation, ChallengeMarkExpectedMutationVariables>;
export const LinkedAccountsDocument = gql`
    query LinkedAccounts {
  me {
    connections {
      id
      status
      isSyncing
      emailAddress
    }
  }
}
    `;

/**
 * __useLinkedAccountsQuery__
 *
 * To run a query within a React component, call `useLinkedAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinkedAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinkedAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLinkedAccountsQuery(baseOptions?: Apollo.QueryHookOptions<LinkedAccountsQuery, LinkedAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinkedAccountsQuery, LinkedAccountsQueryVariables>(LinkedAccountsDocument, options);
      }
export function useLinkedAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinkedAccountsQuery, LinkedAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinkedAccountsQuery, LinkedAccountsQueryVariables>(LinkedAccountsDocument, options);
        }
export type LinkedAccountsQueryHookResult = ReturnType<typeof useLinkedAccountsQuery>;
export type LinkedAccountsLazyQueryHookResult = ReturnType<typeof useLinkedAccountsLazyQuery>;
export type LinkedAccountsQueryResult = Apollo.QueryResult<LinkedAccountsQuery, LinkedAccountsQueryVariables>;
export const RemoveAccountDocument = gql`
    mutation RemoveAccount($connectionId: String!, $reason: String!, $experience: String!) {
  connectionUnlink(
    input: {connectionId: $connectionId, reasonText: $reason, experienceText: $experience}
  ) {
    id
  }
}
    `;
export type RemoveAccountMutationFn = Apollo.MutationFunction<RemoveAccountMutation, RemoveAccountMutationVariables>;

/**
 * __useRemoveAccountMutation__
 *
 * To run a mutation, you first call `useRemoveAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAccountMutation, { data, loading, error }] = useRemoveAccountMutation({
 *   variables: {
 *      connectionId: // value for 'connectionId'
 *      reason: // value for 'reason'
 *      experience: // value for 'experience'
 *   },
 * });
 */
export function useRemoveAccountMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAccountMutation, RemoveAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAccountMutation, RemoveAccountMutationVariables>(RemoveAccountDocument, options);
      }
export type RemoveAccountMutationHookResult = ReturnType<typeof useRemoveAccountMutation>;
export type RemoveAccountMutationResult = Apollo.MutationResult<RemoveAccountMutation>;
export type RemoveAccountMutationOptions = Apollo.BaseMutationOptions<RemoveAccountMutation, RemoveAccountMutationVariables>;
export const UserChallengeSettingsDocument = gql`
    mutation UserChallengeSettings($input: ChallengeUserSettingsUpdateInput!) {
  challengeUserSettingsUpdate(input: $input) {
    ...ChallengeUserSettingFields
  }
}
    ${ChallengeUserSettingFieldsFragmentDoc}`;
export type UserChallengeSettingsMutationFn = Apollo.MutationFunction<UserChallengeSettingsMutation, UserChallengeSettingsMutationVariables>;

/**
 * __useUserChallengeSettingsMutation__
 *
 * To run a mutation, you first call `useUserChallengeSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserChallengeSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userChallengeSettingsMutation, { data, loading, error }] = useUserChallengeSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserChallengeSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UserChallengeSettingsMutation, UserChallengeSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserChallengeSettingsMutation, UserChallengeSettingsMutationVariables>(UserChallengeSettingsDocument, options);
      }
export type UserChallengeSettingsMutationHookResult = ReturnType<typeof useUserChallengeSettingsMutation>;
export type UserChallengeSettingsMutationResult = Apollo.MutationResult<UserChallengeSettingsMutation>;
export type UserChallengeSettingsMutationOptions = Apollo.BaseMutationOptions<UserChallengeSettingsMutation, UserChallengeSettingsMutationVariables>;
export const ChallengeSettingsDocument = gql`
    query ChallengeSettings {
  challengeSettings {
    ...ChallengeUserSettingFields
  }
}
    ${ChallengeUserSettingFieldsFragmentDoc}`;

/**
 * __useChallengeSettingsQuery__
 *
 * To run a query within a React component, call `useChallengeSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChallengeSettingsQuery(baseOptions?: Apollo.QueryHookOptions<ChallengeSettingsQuery, ChallengeSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChallengeSettingsQuery, ChallengeSettingsQueryVariables>(ChallengeSettingsDocument, options);
      }
export function useChallengeSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChallengeSettingsQuery, ChallengeSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChallengeSettingsQuery, ChallengeSettingsQueryVariables>(ChallengeSettingsDocument, options);
        }
export type ChallengeSettingsQueryHookResult = ReturnType<typeof useChallengeSettingsQuery>;
export type ChallengeSettingsLazyQueryHookResult = ReturnType<typeof useChallengeSettingsLazyQuery>;
export type ChallengeSettingsQueryResult = Apollo.QueryResult<ChallengeSettingsQuery, ChallengeSettingsQueryVariables>;
export const NonprofitCategoriesDocument = gql`
    query NonprofitCategories {
  nonprofitCategories {
    nonprofitCategories {
      id
      name
    }
  }
}
    `;

/**
 * __useNonprofitCategoriesQuery__
 *
 * To run a query within a React component, call `useNonprofitCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNonprofitCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNonprofitCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNonprofitCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<NonprofitCategoriesQuery, NonprofitCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NonprofitCategoriesQuery, NonprofitCategoriesQueryVariables>(NonprofitCategoriesDocument, options);
      }
export function useNonprofitCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NonprofitCategoriesQuery, NonprofitCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NonprofitCategoriesQuery, NonprofitCategoriesQueryVariables>(NonprofitCategoriesDocument, options);
        }
export type NonprofitCategoriesQueryHookResult = ReturnType<typeof useNonprofitCategoriesQuery>;
export type NonprofitCategoriesLazyQueryHookResult = ReturnType<typeof useNonprofitCategoriesLazyQuery>;
export type NonprofitCategoriesQueryResult = Apollo.QueryResult<NonprofitCategoriesQuery, NonprofitCategoriesQueryVariables>;
export const NonprofitsDocument = gql`
    query Nonprofits($input: NonprofitsInput!) {
  nonprofits(input: $input) {
    nonprofits {
      id
      description
      name
      isFeatured
      art
    }
  }
}
    `;

/**
 * __useNonprofitsQuery__
 *
 * To run a query within a React component, call `useNonprofitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNonprofitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNonprofitsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNonprofitsQuery(baseOptions: Apollo.QueryHookOptions<NonprofitsQuery, NonprofitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NonprofitsQuery, NonprofitsQueryVariables>(NonprofitsDocument, options);
      }
export function useNonprofitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NonprofitsQuery, NonprofitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NonprofitsQuery, NonprofitsQueryVariables>(NonprofitsDocument, options);
        }
export type NonprofitsQueryHookResult = ReturnType<typeof useNonprofitsQuery>;
export type NonprofitsLazyQueryHookResult = ReturnType<typeof useNonprofitsLazyQuery>;
export type NonprofitsQueryResult = Apollo.QueryResult<NonprofitsQuery, NonprofitsQueryVariables>;
export const ChallengeInteractionsDocument = gql`
    query ChallengeInteractions($input: ChallengeInteractionsInput!) {
  challengeInteractions(input: $input) {
    pageInfo {
      totalResults
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        interaction
        paymentAmount
        performedAt
        challenge {
          to
          createdAt
        }
      }
    }
  }
}
    `;

/**
 * __useChallengeInteractionsQuery__
 *
 * To run a query within a React component, call `useChallengeInteractionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeInteractionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeInteractionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChallengeInteractionsQuery(baseOptions: Apollo.QueryHookOptions<ChallengeInteractionsQuery, ChallengeInteractionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChallengeInteractionsQuery, ChallengeInteractionsQueryVariables>(ChallengeInteractionsDocument, options);
      }
export function useChallengeInteractionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChallengeInteractionsQuery, ChallengeInteractionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChallengeInteractionsQuery, ChallengeInteractionsQueryVariables>(ChallengeInteractionsDocument, options);
        }
export type ChallengeInteractionsQueryHookResult = ReturnType<typeof useChallengeInteractionsQuery>;
export type ChallengeInteractionsLazyQueryHookResult = ReturnType<typeof useChallengeInteractionsLazyQuery>;
export type ChallengeInteractionsQueryResult = Apollo.QueryResult<ChallengeInteractionsQuery, ChallengeInteractionsQueryVariables>;
export const NetworkConnectionsTileDocument = gql`
    query NetworkConnectionsTile {
  networkConnections(input: {filter: {isUsingGated: true}, pagination: {last: 3}}) {
    edges {
      node {
        id
        avatar
        name
        joinedAt
      }
    }
  }
  networkConnectionStats {
    allKnown
    metWithGated
    usingGated
  }
}
    `;

/**
 * __useNetworkConnectionsTileQuery__
 *
 * To run a query within a React component, call `useNetworkConnectionsTileQuery` and pass it any options that fit your needs.
 * When your component renders, `useNetworkConnectionsTileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNetworkConnectionsTileQuery({
 *   variables: {
 *   },
 * });
 */
export function useNetworkConnectionsTileQuery(baseOptions?: Apollo.QueryHookOptions<NetworkConnectionsTileQuery, NetworkConnectionsTileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NetworkConnectionsTileQuery, NetworkConnectionsTileQueryVariables>(NetworkConnectionsTileDocument, options);
      }
export function useNetworkConnectionsTileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NetworkConnectionsTileQuery, NetworkConnectionsTileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NetworkConnectionsTileQuery, NetworkConnectionsTileQueryVariables>(NetworkConnectionsTileDocument, options);
        }
export type NetworkConnectionsTileQueryHookResult = ReturnType<typeof useNetworkConnectionsTileQuery>;
export type NetworkConnectionsTileLazyQueryHookResult = ReturnType<typeof useNetworkConnectionsTileLazyQuery>;
export type NetworkConnectionsTileQueryResult = Apollo.QueryResult<NetworkConnectionsTileQuery, NetworkConnectionsTileQueryVariables>;
export const DonationTileDocument = gql`
    query DonationTile {
  challengeStats {
    donationTotal
    donationAllTimeHigh
    challengesSent
  }
  challengeInteractions(input: {interaction: Donated, pagination: {last: 3}}) {
    edges {
      node {
        paymentAmount
        performedAt
        challenge {
          to
        }
      }
    }
  }
}
    `;

/**
 * __useDonationTileQuery__
 *
 * To run a query within a React component, call `useDonationTileQuery` and pass it any options that fit your needs.
 * When your component renders, `useDonationTileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDonationTileQuery({
 *   variables: {
 *   },
 * });
 */
export function useDonationTileQuery(baseOptions?: Apollo.QueryHookOptions<DonationTileQuery, DonationTileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DonationTileQuery, DonationTileQueryVariables>(DonationTileDocument, options);
      }
export function useDonationTileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DonationTileQuery, DonationTileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DonationTileQuery, DonationTileQueryVariables>(DonationTileDocument, options);
        }
export type DonationTileQueryHookResult = ReturnType<typeof useDonationTileQuery>;
export type DonationTileLazyQueryHookResult = ReturnType<typeof useDonationTileLazyQuery>;
export type DonationTileQueryResult = Apollo.QueryResult<DonationTileQuery, DonationTileQueryVariables>;
export const RecentDecisionsDocument = gql`
    query RecentDecisions {
  decisions(input: {filter: {rulings: [Gate, Mute]}, pagination: {last: 3}}) {
    edges {
      node {
        id
        emailAddress
        decidedAt
        ruling
      }
    }
  }
}
    `;

/**
 * __useRecentDecisionsQuery__
 *
 * To run a query within a React component, call `useRecentDecisionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentDecisionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentDecisionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecentDecisionsQuery(baseOptions?: Apollo.QueryHookOptions<RecentDecisionsQuery, RecentDecisionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentDecisionsQuery, RecentDecisionsQueryVariables>(RecentDecisionsDocument, options);
      }
export function useRecentDecisionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentDecisionsQuery, RecentDecisionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentDecisionsQuery, RecentDecisionsQueryVariables>(RecentDecisionsDocument, options);
        }
export type RecentDecisionsQueryHookResult = ReturnType<typeof useRecentDecisionsQuery>;
export type RecentDecisionsLazyQueryHookResult = ReturnType<typeof useRecentDecisionsLazyQuery>;
export type RecentDecisionsQueryResult = Apollo.QueryResult<RecentDecisionsQuery, RecentDecisionsQueryVariables>;
export const AllowListAddressReviewDocument = gql`
    query AllowListAddressReview($connectionId: ID!) {
  previewAllowed(id: $connectionId) {
    results {
      id
      sender {
        emailAddress
        displayName
      }
    }
  }
}
    `;

/**
 * __useAllowListAddressReviewQuery__
 *
 * To run a query within a React component, call `useAllowListAddressReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllowListAddressReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllowListAddressReviewQuery({
 *   variables: {
 *      connectionId: // value for 'connectionId'
 *   },
 * });
 */
export function useAllowListAddressReviewQuery(baseOptions: Apollo.QueryHookOptions<AllowListAddressReviewQuery, AllowListAddressReviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllowListAddressReviewQuery, AllowListAddressReviewQueryVariables>(AllowListAddressReviewDocument, options);
      }
export function useAllowListAddressReviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllowListAddressReviewQuery, AllowListAddressReviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllowListAddressReviewQuery, AllowListAddressReviewQueryVariables>(AllowListAddressReviewDocument, options);
        }
export type AllowListAddressReviewQueryHookResult = ReturnType<typeof useAllowListAddressReviewQuery>;
export type AllowListAddressReviewLazyQueryHookResult = ReturnType<typeof useAllowListAddressReviewLazyQuery>;
export type AllowListAddressReviewQueryResult = Apollo.QueryResult<AllowListAddressReviewQuery, AllowListAddressReviewQueryVariables>;
export const AllowListDomainReviewDocument = gql`
    query AllowListDomainReview {
  trainingSearch(
    input: {type: Domains, pagination: {first: 10}, filter: {rule: Allow}}
  ) {
    edges {
      cursor
      node {
        id
        domain
      }
    }
  }
}
    `;

/**
 * __useAllowListDomainReviewQuery__
 *
 * To run a query within a React component, call `useAllowListDomainReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllowListDomainReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllowListDomainReviewQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllowListDomainReviewQuery(baseOptions?: Apollo.QueryHookOptions<AllowListDomainReviewQuery, AllowListDomainReviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllowListDomainReviewQuery, AllowListDomainReviewQueryVariables>(AllowListDomainReviewDocument, options);
      }
export function useAllowListDomainReviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllowListDomainReviewQuery, AllowListDomainReviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllowListDomainReviewQuery, AllowListDomainReviewQueryVariables>(AllowListDomainReviewDocument, options);
        }
export type AllowListDomainReviewQueryHookResult = ReturnType<typeof useAllowListDomainReviewQuery>;
export type AllowListDomainReviewLazyQueryHookResult = ReturnType<typeof useAllowListDomainReviewLazyQuery>;
export type AllowListDomainReviewQueryResult = Apollo.QueryResult<AllowListDomainReviewQuery, AllowListDomainReviewQueryVariables>;
export const OnboardingDetailsDocument = gql`
    query OnboardingDetails {
  userTasks(input: {onlyUnresolved: false}) {
    id
    task
    resolution
  }
}
    `;

/**
 * __useOnboardingDetailsQuery__
 *
 * To run a query within a React component, call `useOnboardingDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOnboardingDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnboardingDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOnboardingDetailsQuery(baseOptions?: Apollo.QueryHookOptions<OnboardingDetailsQuery, OnboardingDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OnboardingDetailsQuery, OnboardingDetailsQueryVariables>(OnboardingDetailsDocument, options);
      }
export function useOnboardingDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OnboardingDetailsQuery, OnboardingDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OnboardingDetailsQuery, OnboardingDetailsQueryVariables>(OnboardingDetailsDocument, options);
        }
export type OnboardingDetailsQueryHookResult = ReturnType<typeof useOnboardingDetailsQuery>;
export type OnboardingDetailsLazyQueryHookResult = ReturnType<typeof useOnboardingDetailsLazyQuery>;
export type OnboardingDetailsQueryResult = Apollo.QueryResult<OnboardingDetailsQuery, OnboardingDetailsQueryVariables>;
export const MarkOnboardingTaskCompleteDocument = gql`
    mutation MarkOnboardingTaskComplete($input: UserTaskResolvedInput!) {
  userTaskResolved(input: $input) {
    id
    resolution
  }
}
    `;
export type MarkOnboardingTaskCompleteMutationFn = Apollo.MutationFunction<MarkOnboardingTaskCompleteMutation, MarkOnboardingTaskCompleteMutationVariables>;

/**
 * __useMarkOnboardingTaskCompleteMutation__
 *
 * To run a mutation, you first call `useMarkOnboardingTaskCompleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkOnboardingTaskCompleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markOnboardingTaskCompleteMutation, { data, loading, error }] = useMarkOnboardingTaskCompleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkOnboardingTaskCompleteMutation(baseOptions?: Apollo.MutationHookOptions<MarkOnboardingTaskCompleteMutation, MarkOnboardingTaskCompleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkOnboardingTaskCompleteMutation, MarkOnboardingTaskCompleteMutationVariables>(MarkOnboardingTaskCompleteDocument, options);
      }
export type MarkOnboardingTaskCompleteMutationHookResult = ReturnType<typeof useMarkOnboardingTaskCompleteMutation>;
export type MarkOnboardingTaskCompleteMutationResult = Apollo.MutationResult<MarkOnboardingTaskCompleteMutation>;
export type MarkOnboardingTaskCompleteMutationOptions = Apollo.BaseMutationOptions<MarkOnboardingTaskCompleteMutation, MarkOnboardingTaskCompleteMutationVariables>;
export const ConnectionsStatusDocument = gql`
    query ConnectionsStatus {
  me {
    connections {
      id
      status
    }
  }
}
    `;

/**
 * __useConnectionsStatusQuery__
 *
 * To run a query within a React component, call `useConnectionsStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useConnectionsStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConnectionsStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useConnectionsStatusQuery(baseOptions?: Apollo.QueryHookOptions<ConnectionsStatusQuery, ConnectionsStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConnectionsStatusQuery, ConnectionsStatusQueryVariables>(ConnectionsStatusDocument, options);
      }
export function useConnectionsStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConnectionsStatusQuery, ConnectionsStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConnectionsStatusQuery, ConnectionsStatusQueryVariables>(ConnectionsStatusDocument, options);
        }
export type ConnectionsStatusQueryHookResult = ReturnType<typeof useConnectionsStatusQuery>;
export type ConnectionsStatusLazyQueryHookResult = ReturnType<typeof useConnectionsStatusLazyQuery>;
export type ConnectionsStatusQueryResult = Apollo.QueryResult<ConnectionsStatusQuery, ConnectionsStatusQueryVariables>;
export const OnboardingConnectInboxDocument = gql`
    query OnboardingConnectInbox {
  me {
    notificationSettings {
      email
    }
  }
}
    `;

/**
 * __useOnboardingConnectInboxQuery__
 *
 * To run a query within a React component, call `useOnboardingConnectInboxQuery` and pass it any options that fit your needs.
 * When your component renders, `useOnboardingConnectInboxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnboardingConnectInboxQuery({
 *   variables: {
 *   },
 * });
 */
export function useOnboardingConnectInboxQuery(baseOptions?: Apollo.QueryHookOptions<OnboardingConnectInboxQuery, OnboardingConnectInboxQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OnboardingConnectInboxQuery, OnboardingConnectInboxQueryVariables>(OnboardingConnectInboxDocument, options);
      }
export function useOnboardingConnectInboxLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OnboardingConnectInboxQuery, OnboardingConnectInboxQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OnboardingConnectInboxQuery, OnboardingConnectInboxQueryVariables>(OnboardingConnectInboxDocument, options);
        }
export type OnboardingConnectInboxQueryHookResult = ReturnType<typeof useOnboardingConnectInboxQuery>;
export type OnboardingConnectInboxLazyQueryHookResult = ReturnType<typeof useOnboardingConnectInboxLazyQuery>;
export type OnboardingConnectInboxQueryResult = Apollo.QueryResult<OnboardingConnectInboxQuery, OnboardingConnectInboxQueryVariables>;
export const OffboardDocument = gql`
    mutation Offboard($input: DeleteAccountRequest!) {
  offboard(input: $input) {
    id
  }
}
    `;
export type OffboardMutationFn = Apollo.MutationFunction<OffboardMutation, OffboardMutationVariables>;

/**
 * __useOffboardMutation__
 *
 * To run a mutation, you first call `useOffboardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOffboardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [offboardMutation, { data, loading, error }] = useOffboardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOffboardMutation(baseOptions?: Apollo.MutationHookOptions<OffboardMutation, OffboardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OffboardMutation, OffboardMutationVariables>(OffboardDocument, options);
      }
export type OffboardMutationHookResult = ReturnType<typeof useOffboardMutation>;
export type OffboardMutationResult = Apollo.MutationResult<OffboardMutation>;
export type OffboardMutationOptions = Apollo.BaseMutationOptions<OffboardMutation, OffboardMutationVariables>;
export const NameAvatarDocument = gql`
    query NameAvatar {
  me {
    id
    firstName
    lastName
    fullName
    joinedAt
    avatar
  }
}
    `;

/**
 * __useNameAvatarQuery__
 *
 * To run a query within a React component, call `useNameAvatarQuery` and pass it any options that fit your needs.
 * When your component renders, `useNameAvatarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNameAvatarQuery({
 *   variables: {
 *   },
 * });
 */
export function useNameAvatarQuery(baseOptions?: Apollo.QueryHookOptions<NameAvatarQuery, NameAvatarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NameAvatarQuery, NameAvatarQueryVariables>(NameAvatarDocument, options);
      }
export function useNameAvatarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NameAvatarQuery, NameAvatarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NameAvatarQuery, NameAvatarQueryVariables>(NameAvatarDocument, options);
        }
export type NameAvatarQueryHookResult = ReturnType<typeof useNameAvatarQuery>;
export type NameAvatarLazyQueryHookResult = ReturnType<typeof useNameAvatarLazyQuery>;
export type NameAvatarQueryResult = Apollo.QueryResult<NameAvatarQuery, NameAvatarQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UserUpdateInput!) {
  userUpdate(input: $input) {
    id
    avatar
    firstName
    lastName
    fullName
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateNotificationUserSettingsDocument = gql`
    mutation UpdateNotificationUserSettings($input: NotificationUserSettingsUpdateInput!) {
  notificationUserSettingsUpdate(input: $input) {
    ...NotificationUserSettingsFields
  }
}
    ${NotificationUserSettingsFieldsFragmentDoc}`;
export type UpdateNotificationUserSettingsMutationFn = Apollo.MutationFunction<UpdateNotificationUserSettingsMutation, UpdateNotificationUserSettingsMutationVariables>;

/**
 * __useUpdateNotificationUserSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationUserSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationUserSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationUserSettingsMutation, { data, loading, error }] = useUpdateNotificationUserSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNotificationUserSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationUserSettingsMutation, UpdateNotificationUserSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationUserSettingsMutation, UpdateNotificationUserSettingsMutationVariables>(UpdateNotificationUserSettingsDocument, options);
      }
export type UpdateNotificationUserSettingsMutationHookResult = ReturnType<typeof useUpdateNotificationUserSettingsMutation>;
export type UpdateNotificationUserSettingsMutationResult = Apollo.MutationResult<UpdateNotificationUserSettingsMutation>;
export type UpdateNotificationUserSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationUserSettingsMutation, UpdateNotificationUserSettingsMutationVariables>;
export const NotificationUserSettingsDocument = gql`
    query NotificationUserSettings {
  notificationUserSettings {
    ...NotificationUserSettingsFields
  }
}
    ${NotificationUserSettingsFieldsFragmentDoc}`;

/**
 * __useNotificationUserSettingsQuery__
 *
 * To run a query within a React component, call `useNotificationUserSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationUserSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationUserSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationUserSettingsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationUserSettingsQuery, NotificationUserSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationUserSettingsQuery, NotificationUserSettingsQueryVariables>(NotificationUserSettingsDocument, options);
      }
export function useNotificationUserSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationUserSettingsQuery, NotificationUserSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationUserSettingsQuery, NotificationUserSettingsQueryVariables>(NotificationUserSettingsDocument, options);
        }
export type NotificationUserSettingsQueryHookResult = ReturnType<typeof useNotificationUserSettingsQuery>;
export type NotificationUserSettingsLazyQueryHookResult = ReturnType<typeof useNotificationUserSettingsLazyQuery>;
export type NotificationUserSettingsQueryResult = Apollo.QueryResult<NotificationUserSettingsQuery, NotificationUserSettingsQueryVariables>;
export const QueryConnectionsDocument = gql`
    query QueryConnections {
  me {
    id
    connections {
      ...ConnectionField
    }
  }
}
    ${ConnectionFieldFragmentDoc}`;

/**
 * __useQueryConnectionsQuery__
 *
 * To run a query within a React component, call `useQueryConnectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryConnectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryConnectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryConnectionsQuery(baseOptions?: Apollo.QueryHookOptions<QueryConnectionsQuery, QueryConnectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryConnectionsQuery, QueryConnectionsQueryVariables>(QueryConnectionsDocument, options);
      }
export function useQueryConnectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryConnectionsQuery, QueryConnectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryConnectionsQuery, QueryConnectionsQueryVariables>(QueryConnectionsDocument, options);
        }
export type QueryConnectionsQueryHookResult = ReturnType<typeof useQueryConnectionsQuery>;
export type QueryConnectionsLazyQueryHookResult = ReturnType<typeof useQueryConnectionsLazyQuery>;
export type QueryConnectionsQueryResult = Apollo.QueryResult<QueryConnectionsQuery, QueryConnectionsQueryVariables>;
export const MutationActivateConnectionDocument = gql`
    mutation MutationActivateConnection($input: ConnectionActivateInput!) {
  connectionActivate(input: $input) {
    ...ConnectionField
  }
}
    ${ConnectionFieldFragmentDoc}`;
export type MutationActivateConnectionMutationFn = Apollo.MutationFunction<MutationActivateConnectionMutation, MutationActivateConnectionMutationVariables>;

/**
 * __useMutationActivateConnectionMutation__
 *
 * To run a mutation, you first call `useMutationActivateConnectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationActivateConnectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationActivateConnectionMutation, { data, loading, error }] = useMutationActivateConnectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMutationActivateConnectionMutation(baseOptions?: Apollo.MutationHookOptions<MutationActivateConnectionMutation, MutationActivateConnectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationActivateConnectionMutation, MutationActivateConnectionMutationVariables>(MutationActivateConnectionDocument, options);
      }
export type MutationActivateConnectionMutationHookResult = ReturnType<typeof useMutationActivateConnectionMutation>;
export type MutationActivateConnectionMutationResult = Apollo.MutationResult<MutationActivateConnectionMutation>;
export type MutationActivateConnectionMutationOptions = Apollo.BaseMutationOptions<MutationActivateConnectionMutation, MutationActivateConnectionMutationVariables>;
export const MutationDeactivateConnectionDocument = gql`
    mutation MutationDeactivateConnection($input: ConnectionDeactivateInput!) {
  connectionDeactivate(input: $input) {
    ...ConnectionField
  }
}
    ${ConnectionFieldFragmentDoc}`;
export type MutationDeactivateConnectionMutationFn = Apollo.MutationFunction<MutationDeactivateConnectionMutation, MutationDeactivateConnectionMutationVariables>;

/**
 * __useMutationDeactivateConnectionMutation__
 *
 * To run a mutation, you first call `useMutationDeactivateConnectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationDeactivateConnectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationDeactivateConnectionMutation, { data, loading, error }] = useMutationDeactivateConnectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMutationDeactivateConnectionMutation(baseOptions?: Apollo.MutationHookOptions<MutationDeactivateConnectionMutation, MutationDeactivateConnectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationDeactivateConnectionMutation, MutationDeactivateConnectionMutationVariables>(MutationDeactivateConnectionDocument, options);
      }
export type MutationDeactivateConnectionMutationHookResult = ReturnType<typeof useMutationDeactivateConnectionMutation>;
export type MutationDeactivateConnectionMutationResult = Apollo.MutationResult<MutationDeactivateConnectionMutation>;
export type MutationDeactivateConnectionMutationOptions = Apollo.BaseMutationOptions<MutationDeactivateConnectionMutation, MutationDeactivateConnectionMutationVariables>;
export const MutationUnlinkConnectionDocument = gql`
    mutation MutationUnlinkConnection($input: ConnectionUnlinkInput!) {
  connectionUnlink(input: $input) {
    id
  }
}
    `;
export type MutationUnlinkConnectionMutationFn = Apollo.MutationFunction<MutationUnlinkConnectionMutation, MutationUnlinkConnectionMutationVariables>;

/**
 * __useMutationUnlinkConnectionMutation__
 *
 * To run a mutation, you first call `useMutationUnlinkConnectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationUnlinkConnectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationUnlinkConnectionMutation, { data, loading, error }] = useMutationUnlinkConnectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMutationUnlinkConnectionMutation(baseOptions?: Apollo.MutationHookOptions<MutationUnlinkConnectionMutation, MutationUnlinkConnectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationUnlinkConnectionMutation, MutationUnlinkConnectionMutationVariables>(MutationUnlinkConnectionDocument, options);
      }
export type MutationUnlinkConnectionMutationHookResult = ReturnType<typeof useMutationUnlinkConnectionMutation>;
export type MutationUnlinkConnectionMutationResult = Apollo.MutationResult<MutationUnlinkConnectionMutation>;
export type MutationUnlinkConnectionMutationOptions = Apollo.BaseMutationOptions<MutationUnlinkConnectionMutation, MutationUnlinkConnectionMutationVariables>;
export const QueryDecisionTestDocument = gql`
    query QueryDecisionTest($address: String!) {
  decisionTest(input: {address: $address}) {
    ruling
    verdict
    enforcedPattern {
      id
      expression
    }
    enforcedTraining {
      id
      domain
      username
      createdAt
      origin
      inheritedRule
    }
  }
}
    `;

/**
 * __useQueryDecisionTestQuery__
 *
 * To run a query within a React component, call `useQueryDecisionTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryDecisionTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryDecisionTestQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useQueryDecisionTestQuery(baseOptions: Apollo.QueryHookOptions<QueryDecisionTestQuery, QueryDecisionTestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryDecisionTestQuery, QueryDecisionTestQueryVariables>(QueryDecisionTestDocument, options);
      }
export function useQueryDecisionTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryDecisionTestQuery, QueryDecisionTestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryDecisionTestQuery, QueryDecisionTestQueryVariables>(QueryDecisionTestDocument, options);
        }
export type QueryDecisionTestQueryHookResult = ReturnType<typeof useQueryDecisionTestQuery>;
export type QueryDecisionTestLazyQueryHookResult = ReturnType<typeof useQueryDecisionTestLazyQuery>;
export type QueryDecisionTestQueryResult = Apollo.QueryResult<QueryDecisionTestQuery, QueryDecisionTestQueryVariables>;
export const QueryDecisionsDocument = gql`
    query QueryDecisions($input: DecisionsInput!) {
  decisions(input: $input) {
    pageInfo {
      totalResults
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        ...DecisionFields
      }
    }
  }
}
    ${DecisionFieldsFragmentDoc}`;

/**
 * __useQueryDecisionsQuery__
 *
 * To run a query within a React component, call `useQueryDecisionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryDecisionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryDecisionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useQueryDecisionsQuery(baseOptions: Apollo.QueryHookOptions<QueryDecisionsQuery, QueryDecisionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryDecisionsQuery, QueryDecisionsQueryVariables>(QueryDecisionsDocument, options);
      }
export function useQueryDecisionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryDecisionsQuery, QueryDecisionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryDecisionsQuery, QueryDecisionsQueryVariables>(QueryDecisionsDocument, options);
        }
export type QueryDecisionsQueryHookResult = ReturnType<typeof useQueryDecisionsQuery>;
export type QueryDecisionsLazyQueryHookResult = ReturnType<typeof useQueryDecisionsLazyQuery>;
export type QueryDecisionsQueryResult = Apollo.QueryResult<QueryDecisionsQuery, QueryDecisionsQueryVariables>;
export const QueryDecisionDocument = gql`
    query QueryDecision($decisionId: ID!) {
  decision(id: $decisionId) {
    ...DecisionFields
  }
}
    ${DecisionFieldsFragmentDoc}`;

/**
 * __useQueryDecisionQuery__
 *
 * To run a query within a React component, call `useQueryDecisionQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryDecisionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryDecisionQuery({
 *   variables: {
 *      decisionId: // value for 'decisionId'
 *   },
 * });
 */
export function useQueryDecisionQuery(baseOptions: Apollo.QueryHookOptions<QueryDecisionQuery, QueryDecisionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryDecisionQuery, QueryDecisionQueryVariables>(QueryDecisionDocument, options);
      }
export function useQueryDecisionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryDecisionQuery, QueryDecisionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryDecisionQuery, QueryDecisionQueryVariables>(QueryDecisionDocument, options);
        }
export type QueryDecisionQueryHookResult = ReturnType<typeof useQueryDecisionQuery>;
export type QueryDecisionLazyQueryHookResult = ReturnType<typeof useQueryDecisionLazyQuery>;
export type QueryDecisionQueryResult = Apollo.QueryResult<QueryDecisionQuery, QueryDecisionQueryVariables>;
export const QueryDonationTotalFromSenderDocument = gql`
    query QueryDonationTotalFromSender($input: DonationTotalFromSenderQueryInput!) {
  donationTotalFromSender(input: $input) {
    donationsCount
    totalAmountInCents
  }
}
    `;

/**
 * __useQueryDonationTotalFromSenderQuery__
 *
 * To run a query within a React component, call `useQueryDonationTotalFromSenderQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryDonationTotalFromSenderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryDonationTotalFromSenderQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useQueryDonationTotalFromSenderQuery(baseOptions: Apollo.QueryHookOptions<QueryDonationTotalFromSenderQuery, QueryDonationTotalFromSenderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryDonationTotalFromSenderQuery, QueryDonationTotalFromSenderQueryVariables>(QueryDonationTotalFromSenderDocument, options);
      }
export function useQueryDonationTotalFromSenderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryDonationTotalFromSenderQuery, QueryDonationTotalFromSenderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryDonationTotalFromSenderQuery, QueryDonationTotalFromSenderQueryVariables>(QueryDonationTotalFromSenderDocument, options);
        }
export type QueryDonationTotalFromSenderQueryHookResult = ReturnType<typeof useQueryDonationTotalFromSenderQuery>;
export type QueryDonationTotalFromSenderLazyQueryHookResult = ReturnType<typeof useQueryDonationTotalFromSenderLazyQuery>;
export type QueryDonationTotalFromSenderQueryResult = Apollo.QueryResult<QueryDonationTotalFromSenderQuery, QueryDonationTotalFromSenderQueryVariables>;
export const QueryDonationsDocument = gql`
    query QueryDonations($pagination: Pagination) {
  challengeInteractions(input: {interaction: Donated, pagination: $pagination}) {
    pageInfo {
      hasNextPage
      endCursor
      totalResults
    }
    edges {
      cursor
      node {
        id
        performedAt
        paymentAmount
        challenge {
          id
          to
        }
      }
    }
  }
}
    `;

/**
 * __useQueryDonationsQuery__
 *
 * To run a query within a React component, call `useQueryDonationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryDonationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryDonationsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useQueryDonationsQuery(baseOptions?: Apollo.QueryHookOptions<QueryDonationsQuery, QueryDonationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryDonationsQuery, QueryDonationsQueryVariables>(QueryDonationsDocument, options);
      }
export function useQueryDonationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryDonationsQuery, QueryDonationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryDonationsQuery, QueryDonationsQueryVariables>(QueryDonationsDocument, options);
        }
export type QueryDonationsQueryHookResult = ReturnType<typeof useQueryDonationsQuery>;
export type QueryDonationsLazyQueryHookResult = ReturnType<typeof useQueryDonationsLazyQuery>;
export type QueryDonationsQueryResult = Apollo.QueryResult<QueryDonationsQuery, QueryDonationsQueryVariables>;
export const QueryDonationStatsDocument = gql`
    query QueryDonationStats {
  challengeStats {
    donationTotal
    donationCount
  }
}
    `;

/**
 * __useQueryDonationStatsQuery__
 *
 * To run a query within a React component, call `useQueryDonationStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryDonationStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryDonationStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryDonationStatsQuery(baseOptions?: Apollo.QueryHookOptions<QueryDonationStatsQuery, QueryDonationStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryDonationStatsQuery, QueryDonationStatsQueryVariables>(QueryDonationStatsDocument, options);
      }
export function useQueryDonationStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryDonationStatsQuery, QueryDonationStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryDonationStatsQuery, QueryDonationStatsQueryVariables>(QueryDonationStatsDocument, options);
        }
export type QueryDonationStatsQueryHookResult = ReturnType<typeof useQueryDonationStatsQuery>;
export type QueryDonationStatsLazyQueryHookResult = ReturnType<typeof useQueryDonationStatsLazyQuery>;
export type QueryDonationStatsQueryResult = Apollo.QueryResult<QueryDonationStatsQuery, QueryDonationStatsQueryVariables>;
export const GatedStatsDocument = gql`
    query gatedStats {
  stats {
    lastThirtyDays {
      totalCount
      gatedCount
    }
    previousThirtyDays {
      totalCount
      gatedCount
    }
  }
}
    `;

/**
 * __useGatedStatsQuery__
 *
 * To run a query within a React component, call `useGatedStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGatedStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGatedStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGatedStatsQuery(baseOptions?: Apollo.QueryHookOptions<GatedStatsQuery, GatedStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GatedStatsQuery, GatedStatsQueryVariables>(GatedStatsDocument, options);
      }
export function useGatedStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GatedStatsQuery, GatedStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GatedStatsQuery, GatedStatsQueryVariables>(GatedStatsDocument, options);
        }
export type GatedStatsQueryHookResult = ReturnType<typeof useGatedStatsQuery>;
export type GatedStatsLazyQueryHookResult = ReturnType<typeof useGatedStatsLazyQuery>;
export type GatedStatsQueryResult = Apollo.QueryResult<GatedStatsQuery, GatedStatsQueryVariables>;
export const QueryNonprofitCategoriesDocument = gql`
    query QueryNonprofitCategories {
  nonprofitCategories {
    nonprofitCategories {
      id
      name
    }
  }
}
    `;

/**
 * __useQueryNonprofitCategoriesQuery__
 *
 * To run a query within a React component, call `useQueryNonprofitCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryNonprofitCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryNonprofitCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryNonprofitCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<QueryNonprofitCategoriesQuery, QueryNonprofitCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryNonprofitCategoriesQuery, QueryNonprofitCategoriesQueryVariables>(QueryNonprofitCategoriesDocument, options);
      }
export function useQueryNonprofitCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryNonprofitCategoriesQuery, QueryNonprofitCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryNonprofitCategoriesQuery, QueryNonprofitCategoriesQueryVariables>(QueryNonprofitCategoriesDocument, options);
        }
export type QueryNonprofitCategoriesQueryHookResult = ReturnType<typeof useQueryNonprofitCategoriesQuery>;
export type QueryNonprofitCategoriesLazyQueryHookResult = ReturnType<typeof useQueryNonprofitCategoriesLazyQuery>;
export type QueryNonprofitCategoriesQueryResult = Apollo.QueryResult<QueryNonprofitCategoriesQuery, QueryNonprofitCategoriesQueryVariables>;
export const QueryNonprofitsDocument = gql`
    query QueryNonprofits {
  nonprofits(input: {isDisplay: true}) {
    nonprofits {
      ...NonprofitFields
      category {
        ...NonprofitCategoryFields
      }
    }
  }
}
    ${NonprofitFieldsFragmentDoc}
${NonprofitCategoryFieldsFragmentDoc}`;

/**
 * __useQueryNonprofitsQuery__
 *
 * To run a query within a React component, call `useQueryNonprofitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryNonprofitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryNonprofitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryNonprofitsQuery(baseOptions?: Apollo.QueryHookOptions<QueryNonprofitsQuery, QueryNonprofitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryNonprofitsQuery, QueryNonprofitsQueryVariables>(QueryNonprofitsDocument, options);
      }
export function useQueryNonprofitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryNonprofitsQuery, QueryNonprofitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryNonprofitsQuery, QueryNonprofitsQueryVariables>(QueryNonprofitsDocument, options);
        }
export type QueryNonprofitsQueryHookResult = ReturnType<typeof useQueryNonprofitsQuery>;
export type QueryNonprofitsLazyQueryHookResult = ReturnType<typeof useQueryNonprofitsLazyQuery>;
export type QueryNonprofitsQueryResult = Apollo.QueryResult<QueryNonprofitsQuery, QueryNonprofitsQueryVariables>;
export const QueryNonprofitDocument = gql`
    query QueryNonprofit($nonprofitId: ID!) {
  nonprofit(id: $nonprofitId) {
    ...NonprofitFields
  }
}
    ${NonprofitFieldsFragmentDoc}`;

/**
 * __useQueryNonprofitQuery__
 *
 * To run a query within a React component, call `useQueryNonprofitQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryNonprofitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryNonprofitQuery({
 *   variables: {
 *      nonprofitId: // value for 'nonprofitId'
 *   },
 * });
 */
export function useQueryNonprofitQuery(baseOptions: Apollo.QueryHookOptions<QueryNonprofitQuery, QueryNonprofitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryNonprofitQuery, QueryNonprofitQueryVariables>(QueryNonprofitDocument, options);
      }
export function useQueryNonprofitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryNonprofitQuery, QueryNonprofitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryNonprofitQuery, QueryNonprofitQueryVariables>(QueryNonprofitDocument, options);
        }
export type QueryNonprofitQueryHookResult = ReturnType<typeof useQueryNonprofitQuery>;
export type QueryNonprofitLazyQueryHookResult = ReturnType<typeof useQueryNonprofitLazyQuery>;
export type QueryNonprofitQueryResult = Apollo.QueryResult<QueryNonprofitQuery, QueryNonprofitQueryVariables>;
export const QueryNonprofitDefaultDocument = gql`
    query QueryNonprofitDefault {
  nonprofitDefault {
    ...NonprofitFields
  }
}
    ${NonprofitFieldsFragmentDoc}`;

/**
 * __useQueryNonprofitDefaultQuery__
 *
 * To run a query within a React component, call `useQueryNonprofitDefaultQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryNonprofitDefaultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryNonprofitDefaultQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryNonprofitDefaultQuery(baseOptions?: Apollo.QueryHookOptions<QueryNonprofitDefaultQuery, QueryNonprofitDefaultQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryNonprofitDefaultQuery, QueryNonprofitDefaultQueryVariables>(QueryNonprofitDefaultDocument, options);
      }
export function useQueryNonprofitDefaultLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryNonprofitDefaultQuery, QueryNonprofitDefaultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryNonprofitDefaultQuery, QueryNonprofitDefaultQueryVariables>(QueryNonprofitDefaultDocument, options);
        }
export type QueryNonprofitDefaultQueryHookResult = ReturnType<typeof useQueryNonprofitDefaultQuery>;
export type QueryNonprofitDefaultLazyQueryHookResult = ReturnType<typeof useQueryNonprofitDefaultLazyQuery>;
export type QueryNonprofitDefaultQueryResult = Apollo.QueryResult<QueryNonprofitDefaultQuery, QueryNonprofitDefaultQueryVariables>;
export const QuerySentReceivedStatDocument = gql`
    query QuerySentReceivedStat($input: SentReceivedStatQueryInput!) {
  sentReceivedStat(input: $input) {
    ...SentReceivedStatFields
  }
}
    ${SentReceivedStatFieldsFragmentDoc}`;

/**
 * __useQuerySentReceivedStatQuery__
 *
 * To run a query within a React component, call `useQuerySentReceivedStatQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuerySentReceivedStatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuerySentReceivedStatQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useQuerySentReceivedStatQuery(baseOptions: Apollo.QueryHookOptions<QuerySentReceivedStatQuery, QuerySentReceivedStatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuerySentReceivedStatQuery, QuerySentReceivedStatQueryVariables>(QuerySentReceivedStatDocument, options);
      }
export function useQuerySentReceivedStatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuerySentReceivedStatQuery, QuerySentReceivedStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuerySentReceivedStatQuery, QuerySentReceivedStatQueryVariables>(QuerySentReceivedStatDocument, options);
        }
export type QuerySentReceivedStatQueryHookResult = ReturnType<typeof useQuerySentReceivedStatQuery>;
export type QuerySentReceivedStatLazyQueryHookResult = ReturnType<typeof useQuerySentReceivedStatLazyQuery>;
export type QuerySentReceivedStatQueryResult = Apollo.QueryResult<QuerySentReceivedStatQuery, QuerySentReceivedStatQueryVariables>;
export const QuerySentReceivedStatsDocument = gql`
    query QuerySentReceivedStats($input: SentReceivedStatsInput!) {
  sentReceivedStats(input: $input) {
    pageInfo {
      totalResults
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        ...SentReceivedStatFields
      }
    }
  }
}
    ${SentReceivedStatFieldsFragmentDoc}`;

/**
 * __useQuerySentReceivedStatsQuery__
 *
 * To run a query within a React component, call `useQuerySentReceivedStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuerySentReceivedStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuerySentReceivedStatsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useQuerySentReceivedStatsQuery(baseOptions: Apollo.QueryHookOptions<QuerySentReceivedStatsQuery, QuerySentReceivedStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuerySentReceivedStatsQuery, QuerySentReceivedStatsQueryVariables>(QuerySentReceivedStatsDocument, options);
      }
export function useQuerySentReceivedStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuerySentReceivedStatsQuery, QuerySentReceivedStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuerySentReceivedStatsQuery, QuerySentReceivedStatsQueryVariables>(QuerySentReceivedStatsDocument, options);
        }
export type QuerySentReceivedStatsQueryHookResult = ReturnType<typeof useQuerySentReceivedStatsQuery>;
export type QuerySentReceivedStatsLazyQueryHookResult = ReturnType<typeof useQuerySentReceivedStatsLazyQuery>;
export type QuerySentReceivedStatsQueryResult = Apollo.QueryResult<QuerySentReceivedStatsQuery, QuerySentReceivedStatsQueryVariables>;
export const TrainAddressDocument = gql`
    mutation TrainAddress($address: String!, $rule: RuleEnum!) {
  trainAddress(input: {emailAddress: $address, rule: $rule, origin: UserApp}) {
    ...TrainingFields
  }
}
    ${TrainingFieldsFragmentDoc}`;
export type TrainAddressMutationFn = Apollo.MutationFunction<TrainAddressMutation, TrainAddressMutationVariables>;

/**
 * __useTrainAddressMutation__
 *
 * To run a mutation, you first call `useTrainAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrainAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trainAddressMutation, { data, loading, error }] = useTrainAddressMutation({
 *   variables: {
 *      address: // value for 'address'
 *      rule: // value for 'rule'
 *   },
 * });
 */
export function useTrainAddressMutation(baseOptions?: Apollo.MutationHookOptions<TrainAddressMutation, TrainAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrainAddressMutation, TrainAddressMutationVariables>(TrainAddressDocument, options);
      }
export type TrainAddressMutationHookResult = ReturnType<typeof useTrainAddressMutation>;
export type TrainAddressMutationResult = Apollo.MutationResult<TrainAddressMutation>;
export type TrainAddressMutationOptions = Apollo.BaseMutationOptions<TrainAddressMutation, TrainAddressMutationVariables>;
export const TrainDomainDocument = gql`
    mutation TrainDomain($domain: String!, $rule: RuleEnum!) {
  trainDomain(input: {domain: $domain, rule: $rule, origin: UserApp}) {
    ...TrainingFields
  }
}
    ${TrainingFieldsFragmentDoc}`;
export type TrainDomainMutationFn = Apollo.MutationFunction<TrainDomainMutation, TrainDomainMutationVariables>;

/**
 * __useTrainDomainMutation__
 *
 * To run a mutation, you first call `useTrainDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrainDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trainDomainMutation, { data, loading, error }] = useTrainDomainMutation({
 *   variables: {
 *      domain: // value for 'domain'
 *      rule: // value for 'rule'
 *   },
 * });
 */
export function useTrainDomainMutation(baseOptions?: Apollo.MutationHookOptions<TrainDomainMutation, TrainDomainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrainDomainMutation, TrainDomainMutationVariables>(TrainDomainDocument, options);
      }
export type TrainDomainMutationHookResult = ReturnType<typeof useTrainDomainMutation>;
export type TrainDomainMutationResult = Apollo.MutationResult<TrainDomainMutation>;
export type TrainDomainMutationOptions = Apollo.BaseMutationOptions<TrainDomainMutation, TrainDomainMutationVariables>;
export const SearchTrainingsDocument = gql`
    query SearchTrainings($input: TrainingsSearchInput!) {
  trainingSearch(input: $input) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
      totalResults
    }
    edges {
      cursor
      node {
        ...TrainingFields
      }
    }
  }
}
    ${TrainingFieldsFragmentDoc}`;

/**
 * __useSearchTrainingsQuery__
 *
 * To run a query within a React component, call `useSearchTrainingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTrainingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTrainingsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchTrainingsQuery(baseOptions: Apollo.QueryHookOptions<SearchTrainingsQuery, SearchTrainingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchTrainingsQuery, SearchTrainingsQueryVariables>(SearchTrainingsDocument, options);
      }
export function useSearchTrainingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTrainingsQuery, SearchTrainingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchTrainingsQuery, SearchTrainingsQueryVariables>(SearchTrainingsDocument, options);
        }
export type SearchTrainingsQueryHookResult = ReturnType<typeof useSearchTrainingsQuery>;
export type SearchTrainingsLazyQueryHookResult = ReturnType<typeof useSearchTrainingsLazyQuery>;
export type SearchTrainingsQueryResult = Apollo.QueryResult<SearchTrainingsQuery, SearchTrainingsQueryVariables>;
export const CheckHandleDocument = gql`
    query CheckHandle($input: UserHandleAvailableQueryInput!) {
  userHandleAvailable(input: $input)
}
    `;

/**
 * __useCheckHandleQuery__
 *
 * To run a query within a React component, call `useCheckHandleQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckHandleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckHandleQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckHandleQuery(baseOptions: Apollo.QueryHookOptions<CheckHandleQuery, CheckHandleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckHandleQuery, CheckHandleQueryVariables>(CheckHandleDocument, options);
      }
export function useCheckHandleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckHandleQuery, CheckHandleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckHandleQuery, CheckHandleQueryVariables>(CheckHandleDocument, options);
        }
export type CheckHandleQueryHookResult = ReturnType<typeof useCheckHandleQuery>;
export type CheckHandleLazyQueryHookResult = ReturnType<typeof useCheckHandleLazyQuery>;
export type CheckHandleQueryResult = Apollo.QueryResult<CheckHandleQuery, CheckHandleQueryVariables>;
export const HandleDocument = gql`
    mutation Handle($input: UserHandleInput!) {
  userHandle(input: $input) {
    id
    handle
  }
}
    `;
export type HandleMutationFn = Apollo.MutationFunction<HandleMutation, HandleMutationVariables>;

/**
 * __useHandleMutation__
 *
 * To run a mutation, you first call `useHandleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleMutation, { data, loading, error }] = useHandleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useHandleMutation(baseOptions?: Apollo.MutationHookOptions<HandleMutation, HandleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleMutation, HandleMutationVariables>(HandleDocument, options);
      }
export type HandleMutationHookResult = ReturnType<typeof useHandleMutation>;
export type HandleMutationResult = Apollo.MutationResult<HandleMutation>;
export type HandleMutationOptions = Apollo.BaseMutationOptions<HandleMutation, HandleMutationVariables>;
export const DonationsDocument = gql`
    query Donations($input: DonationsInput!) {
  donations(input: $input) {
    pageInfo {
      hasNextPage
      hasNextPage
      totalResults
      endCursor
    }
    edges {
      cursor
      node {
        amountInCents
        note
        id
        performedAt
        request {
          type
          id
          memo
          name
        }
      }
    }
  }
}
    `;

/**
 * __useDonationsQuery__
 *
 * To run a query within a React component, call `useDonationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDonationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDonationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDonationsQuery(baseOptions: Apollo.QueryHookOptions<DonationsQuery, DonationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DonationsQuery, DonationsQueryVariables>(DonationsDocument, options);
      }
export function useDonationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DonationsQuery, DonationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DonationsQuery, DonationsQueryVariables>(DonationsDocument, options);
        }
export type DonationsQueryHookResult = ReturnType<typeof useDonationsQuery>;
export type DonationsLazyQueryHookResult = ReturnType<typeof useDonationsLazyQuery>;
export type DonationsQueryResult = Apollo.QueryResult<DonationsQuery, DonationsQueryVariables>;
export const DonationRequestStatsDocument = gql`
    query DonationRequestStats($input: DonationRequestStatsInput!) {
  donationRequestStats(input: $input) {
    donationCount
    donationTotal
    viewCount
  }
}
    `;

/**
 * __useDonationRequestStatsQuery__
 *
 * To run a query within a React component, call `useDonationRequestStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDonationRequestStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDonationRequestStatsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDonationRequestStatsQuery(baseOptions: Apollo.QueryHookOptions<DonationRequestStatsQuery, DonationRequestStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DonationRequestStatsQuery, DonationRequestStatsQueryVariables>(DonationRequestStatsDocument, options);
      }
export function useDonationRequestStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DonationRequestStatsQuery, DonationRequestStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DonationRequestStatsQuery, DonationRequestStatsQueryVariables>(DonationRequestStatsDocument, options);
        }
export type DonationRequestStatsQueryHookResult = ReturnType<typeof useDonationRequestStatsQuery>;
export type DonationRequestStatsLazyQueryHookResult = ReturnType<typeof useDonationRequestStatsLazyQuery>;
export type DonationRequestStatsQueryResult = Apollo.QueryResult<DonationRequestStatsQuery, DonationRequestStatsQueryVariables>;
export const PageDetailsDocument = gql`
    query PageDetails($id: ID!) {
  donationRequest(id: $id) {
    id
    name
    amountInCents
    isFeatured
    createdAt
    cta
    thankYouMessage
    memo
    stats {
      viewCount
      donationTotal
      donationCount
    }
  }
}
    `;

/**
 * __usePageDetailsQuery__
 *
 * To run a query within a React component, call `usePageDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePageDetailsQuery(baseOptions: Apollo.QueryHookOptions<PageDetailsQuery, PageDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageDetailsQuery, PageDetailsQueryVariables>(PageDetailsDocument, options);
      }
export function usePageDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageDetailsQuery, PageDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageDetailsQuery, PageDetailsQueryVariables>(PageDetailsDocument, options);
        }
export type PageDetailsQueryHookResult = ReturnType<typeof usePageDetailsQuery>;
export type PageDetailsLazyQueryHookResult = ReturnType<typeof usePageDetailsLazyQuery>;
export type PageDetailsQueryResult = Apollo.QueryResult<PageDetailsQuery, PageDetailsQueryVariables>;
export const DonationDetailsDocument = gql`
    query DonationDetails($id: ID!) {
  donation(id: $id) {
    amountInCents
    note
    id
    performedAt
  }
}
    `;

/**
 * __useDonationDetailsQuery__
 *
 * To run a query within a React component, call `useDonationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDonationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDonationDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDonationDetailsQuery(baseOptions: Apollo.QueryHookOptions<DonationDetailsQuery, DonationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DonationDetailsQuery, DonationDetailsQueryVariables>(DonationDetailsDocument, options);
      }
export function useDonationDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DonationDetailsQuery, DonationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DonationDetailsQuery, DonationDetailsQueryVariables>(DonationDetailsDocument, options);
        }
export type DonationDetailsQueryHookResult = ReturnType<typeof useDonationDetailsQuery>;
export type DonationDetailsLazyQueryHookResult = ReturnType<typeof useDonationDetailsLazyQuery>;
export type DonationDetailsQueryResult = Apollo.QueryResult<DonationDetailsQuery, DonationDetailsQueryVariables>;
export const DonationRequestDocument = gql`
    query DonationRequest($id: ID!) {
  donationRequest(id: $id) {
    id
    amountInCents
    createdAt
    memo
    isActive
    type
    isFeatured
    name
    lastDonatedAt
    nonprofit {
      id
      name
    }
  }
}
    `;

/**
 * __useDonationRequestQuery__
 *
 * To run a query within a React component, call `useDonationRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useDonationRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDonationRequestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDonationRequestQuery(baseOptions: Apollo.QueryHookOptions<DonationRequestQuery, DonationRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DonationRequestQuery, DonationRequestQueryVariables>(DonationRequestDocument, options);
      }
export function useDonationRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DonationRequestQuery, DonationRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DonationRequestQuery, DonationRequestQueryVariables>(DonationRequestDocument, options);
        }
export type DonationRequestQueryHookResult = ReturnType<typeof useDonationRequestQuery>;
export type DonationRequestLazyQueryHookResult = ReturnType<typeof useDonationRequestLazyQuery>;
export type DonationRequestQueryResult = Apollo.QueryResult<DonationRequestQuery, DonationRequestQueryVariables>;
export const AddPushTokenDocument = gql`
    mutation AddPushToken($input: NotificationAddPushTokenInput!) {
  notificationAddPushToken(input: $input)
}
    `;
export type AddPushTokenMutationFn = Apollo.MutationFunction<AddPushTokenMutation, AddPushTokenMutationVariables>;

/**
 * __useAddPushTokenMutation__
 *
 * To run a mutation, you first call `useAddPushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPushTokenMutation, { data, loading, error }] = useAddPushTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPushTokenMutation(baseOptions?: Apollo.MutationHookOptions<AddPushTokenMutation, AddPushTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPushTokenMutation, AddPushTokenMutationVariables>(AddPushTokenDocument, options);
      }
export type AddPushTokenMutationHookResult = ReturnType<typeof useAddPushTokenMutation>;
export type AddPushTokenMutationResult = Apollo.MutationResult<AddPushTokenMutation>;
export type AddPushTokenMutationOptions = Apollo.BaseMutationOptions<AddPushTokenMutation, AddPushTokenMutationVariables>;
export const AcknowledgeNotificationsDocument = gql`
    mutation AcknowledgeNotifications {
  notificationsAcknowledge
}
    `;
export type AcknowledgeNotificationsMutationFn = Apollo.MutationFunction<AcknowledgeNotificationsMutation, AcknowledgeNotificationsMutationVariables>;

/**
 * __useAcknowledgeNotificationsMutation__
 *
 * To run a mutation, you first call `useAcknowledgeNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcknowledgeNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acknowledgeNotificationsMutation, { data, loading, error }] = useAcknowledgeNotificationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useAcknowledgeNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<AcknowledgeNotificationsMutation, AcknowledgeNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcknowledgeNotificationsMutation, AcknowledgeNotificationsMutationVariables>(AcknowledgeNotificationsDocument, options);
      }
export type AcknowledgeNotificationsMutationHookResult = ReturnType<typeof useAcknowledgeNotificationsMutation>;
export type AcknowledgeNotificationsMutationResult = Apollo.MutationResult<AcknowledgeNotificationsMutation>;
export type AcknowledgeNotificationsMutationOptions = Apollo.BaseMutationOptions<AcknowledgeNotificationsMutation, AcknowledgeNotificationsMutationVariables>;
export const CreateDonationRequestDocument = gql`
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
    `;
export type CreateDonationRequestMutationFn = Apollo.MutationFunction<CreateDonationRequestMutation, CreateDonationRequestMutationVariables>;

/**
 * __useCreateDonationRequestMutation__
 *
 * To run a mutation, you first call `useCreateDonationRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDonationRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDonationRequestMutation, { data, loading, error }] = useCreateDonationRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDonationRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateDonationRequestMutation, CreateDonationRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDonationRequestMutation, CreateDonationRequestMutationVariables>(CreateDonationRequestDocument, options);
      }
export type CreateDonationRequestMutationHookResult = ReturnType<typeof useCreateDonationRequestMutation>;
export type CreateDonationRequestMutationResult = Apollo.MutationResult<CreateDonationRequestMutation>;
export type CreateDonationRequestMutationOptions = Apollo.BaseMutationOptions<CreateDonationRequestMutation, CreateDonationRequestMutationVariables>;
export const DonationRequestsDocument = gql`
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

/**
 * __useDonationRequestsQuery__
 *
 * To run a query within a React component, call `useDonationRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDonationRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDonationRequestsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDonationRequestsQuery(baseOptions: Apollo.QueryHookOptions<DonationRequestsQuery, DonationRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DonationRequestsQuery, DonationRequestsQueryVariables>(DonationRequestsDocument, options);
      }
export function useDonationRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DonationRequestsQuery, DonationRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DonationRequestsQuery, DonationRequestsQueryVariables>(DonationRequestsDocument, options);
        }
export type DonationRequestsQueryHookResult = ReturnType<typeof useDonationRequestsQuery>;
export type DonationRequestsLazyQueryHookResult = ReturnType<typeof useDonationRequestsLazyQuery>;
export type DonationRequestsQueryResult = Apollo.QueryResult<DonationRequestsQuery, DonationRequestsQueryVariables>;
export const SignupActivateDocument = gql`
    query signupActivate {
  me {
    isSignupCompleted
  }
}
    `;

/**
 * __useSignupActivateQuery__
 *
 * To run a query within a React component, call `useSignupActivateQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignupActivateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignupActivateQuery({
 *   variables: {
 *   },
 * });
 */
export function useSignupActivateQuery(baseOptions?: Apollo.QueryHookOptions<SignupActivateQuery, SignupActivateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignupActivateQuery, SignupActivateQueryVariables>(SignupActivateDocument, options);
      }
export function useSignupActivateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignupActivateQuery, SignupActivateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignupActivateQuery, SignupActivateQueryVariables>(SignupActivateDocument, options);
        }
export type SignupActivateQueryHookResult = ReturnType<typeof useSignupActivateQuery>;
export type SignupActivateLazyQueryHookResult = ReturnType<typeof useSignupActivateLazyQuery>;
export type SignupActivateQueryResult = Apollo.QueryResult<SignupActivateQuery, SignupActivateQueryVariables>;
export const SignupSuccessDocument = gql`
    query signupSuccess {
  me {
    notificationSettings {
      email
    }
  }
}
    `;

/**
 * __useSignupSuccessQuery__
 *
 * To run a query within a React component, call `useSignupSuccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignupSuccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignupSuccessQuery({
 *   variables: {
 *   },
 * });
 */
export function useSignupSuccessQuery(baseOptions?: Apollo.QueryHookOptions<SignupSuccessQuery, SignupSuccessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignupSuccessQuery, SignupSuccessQueryVariables>(SignupSuccessDocument, options);
      }
export function useSignupSuccessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignupSuccessQuery, SignupSuccessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignupSuccessQuery, SignupSuccessQueryVariables>(SignupSuccessDocument, options);
        }
export type SignupSuccessQueryHookResult = ReturnType<typeof useSignupSuccessQuery>;
export type SignupSuccessLazyQueryHookResult = ReturnType<typeof useSignupSuccessLazyQuery>;
export type SignupSuccessQueryResult = Apollo.QueryResult<SignupSuccessQuery, SignupSuccessQueryVariables>;
export const UpdatePersonalizationDocument = gql`
    mutation UpdatePersonalization($input: UserPersonalizationUpdateInput!) {
  userUpdatePersonalization(input: $input) {
    ...Personalization
  }
}
    ${PersonalizationFragmentDoc}`;
export type UpdatePersonalizationMutationFn = Apollo.MutationFunction<UpdatePersonalizationMutation, UpdatePersonalizationMutationVariables>;

/**
 * __useUpdatePersonalizationMutation__
 *
 * To run a mutation, you first call `useUpdatePersonalizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonalizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonalizationMutation, { data, loading, error }] = useUpdatePersonalizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePersonalizationMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonalizationMutation, UpdatePersonalizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonalizationMutation, UpdatePersonalizationMutationVariables>(UpdatePersonalizationDocument, options);
      }
export type UpdatePersonalizationMutationHookResult = ReturnType<typeof useUpdatePersonalizationMutation>;
export type UpdatePersonalizationMutationResult = Apollo.MutationResult<UpdatePersonalizationMutation>;
export type UpdatePersonalizationMutationOptions = Apollo.BaseMutationOptions<UpdatePersonalizationMutation, UpdatePersonalizationMutationVariables>;
export const ServiceProviderLookupDocument = gql`
    query ServiceProviderLookup($input: EmailProviderIsGoogleRequestDto!) {
  providerFromAddress(input: $input) {
    emailAddress
    isGoogle
  }
}
    `;

/**
 * __useServiceProviderLookupQuery__
 *
 * To run a query within a React component, call `useServiceProviderLookupQuery` and pass it any options that fit your needs.
 * When your component renders, `useServiceProviderLookupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceProviderLookupQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useServiceProviderLookupQuery(baseOptions: Apollo.QueryHookOptions<ServiceProviderLookupQuery, ServiceProviderLookupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServiceProviderLookupQuery, ServiceProviderLookupQueryVariables>(ServiceProviderLookupDocument, options);
      }
export function useServiceProviderLookupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServiceProviderLookupQuery, ServiceProviderLookupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServiceProviderLookupQuery, ServiceProviderLookupQueryVariables>(ServiceProviderLookupDocument, options);
        }
export type ServiceProviderLookupQueryHookResult = ReturnType<typeof useServiceProviderLookupQuery>;
export type ServiceProviderLookupLazyQueryHookResult = ReturnType<typeof useServiceProviderLookupLazyQuery>;
export type ServiceProviderLookupQueryResult = Apollo.QueryResult<ServiceProviderLookupQuery, ServiceProviderLookupQueryVariables>;
export const DonateDocument = gql`
    mutation Donate($input: DonateInput!) {
  donate(input: $input) {
    donatedInteraction {
      id
    }
    thankYouMessage
  }
}
    `;
export type DonateMutationFn = Apollo.MutationFunction<DonateMutation, DonateMutationVariables>;

/**
 * __useDonateMutation__
 *
 * To run a mutation, you first call `useDonateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDonateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [donateMutation, { data, loading, error }] = useDonateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDonateMutation(baseOptions?: Apollo.MutationHookOptions<DonateMutation, DonateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DonateMutation, DonateMutationVariables>(DonateDocument, options);
      }
export type DonateMutationHookResult = ReturnType<typeof useDonateMutation>;
export type DonateMutationResult = Apollo.MutationResult<DonateMutation>;
export type DonateMutationOptions = Apollo.BaseMutationOptions<DonateMutation, DonateMutationVariables>;
export const MeUserContextDocument = gql`
    query MeUserContext {
  challengeSettings {
    id
    nonprofit {
      name
      id
      slug
    }
  }
  me {
    firstName
    lastName
    fullName
    handle
    referralCode
    id
    avatar
    joinedAt
    notificationSettings {
      email
    }
  }
}
    `;

/**
 * __useMeUserContextQuery__
 *
 * To run a query within a React component, call `useMeUserContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeUserContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeUserContextQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeUserContextQuery(baseOptions?: Apollo.QueryHookOptions<MeUserContextQuery, MeUserContextQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeUserContextQuery, MeUserContextQueryVariables>(MeUserContextDocument, options);
      }
export function useMeUserContextLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeUserContextQuery, MeUserContextQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeUserContextQuery, MeUserContextQueryVariables>(MeUserContextDocument, options);
        }
export type MeUserContextQueryHookResult = ReturnType<typeof useMeUserContextQuery>;
export type MeUserContextLazyQueryHookResult = ReturnType<typeof useMeUserContextLazyQuery>;
export type MeUserContextQueryResult = Apollo.QueryResult<MeUserContextQuery, MeUserContextQueryVariables>;