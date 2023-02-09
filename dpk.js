const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (input) =>
  crypto.createHash("sha3-512").update(input).digest("hex");

const defineCandidate = (event) => {
  const { partitionKey } = event;
  if (partitionKey) {
    return partitionKey;
  }
  return createHash(JSON.stringify(event));
};

const stringfy = (candidate) => {
  if (typeof candidate === "bigint") {
    return candidate.toString();
  } else if (typeof candidate !== "string") {
    return JSON.stringify(candidate);
  }
  return candidate;
};

const processLargeCandidates = (candidate) => {
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash(candidate);
  }
  return candidate;
};

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const candidate = defineCandidate(event);
  const stringfiedCandidate = stringfy(candidate);
  return processLargeCandidates(stringfiedCandidate);
};
