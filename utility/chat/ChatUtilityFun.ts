export const getChatId = (myId: string, recipientId: string): string => {
  return [myId, recipientId].sort().join("_");
};
