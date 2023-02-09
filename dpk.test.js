const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  const generatedHashForEmptyObject =
    "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862";
  const generatedHashForEmptyArray =
    "888b858b73d5d34fedab0f07663436931a95c73d6d7808edc868767bb9172f9e542fb7bb1ad1dbe988ceff0aaffde2012bc0e7d1914e986269f46d93651436a5";
  const generatedHashForNewObject =
    "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862";
  const generatedHashForNullPartitionKey =
    "58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2";
  const generatedHashForZeroPartitionKey =
    "e65a0cb83a95cae7eb0642da576cac881e397c0405c63577c977068f7892f69f1c315baa294124da2a67e0c486d340f9d357377f894d0c0fd850484f8984f2e7";
  const generatedHashForEmptyStringPartitionKey =
    "b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6";
  const generatedHashForFalsePartitionKey =
    "51a5f43b933ce152103a4789a17f1cf958e0b5e1c793082db6a6c74dd3f04c69ad8f558e28cf7c3eac61af4e484741f095129e815c4de4fdd30e3cd6c4e3c00f";
  const generatedHashForNaNPartitionKey =
    "58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2";
  const generatedHashForLargeStringPartitionKey =
    "dbdbea1dfd870ff4c4174b3331d7d332776fdbf2438dc7c910d2c889ca98a62eccb077cac648a3fa40e59362d2f393cf41a7ee3cf9d29a567b74c8353a3d0abc";

  it("should return the literal '0' when given no parameters", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return a hash when given an empty object as parameter", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).toBe(generatedHashForEmptyObject);
  });

  it("should return a hash when given an empty array as parameter", () => {
    const trivialKey = deterministicPartitionKey([]);
    expect(trivialKey).toBe(generatedHashForEmptyArray);
  });

  it("should return a hash when given a 'new Object()' as parameter", () => {
    const trivialKey = deterministicPartitionKey(new Object());
    expect(trivialKey).toBe(generatedHashForNewObject);
  });

  it("should return a hash when given an object with a undefined 'partitionKey' key as parameter", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: undefined });
    expect(trivialKey).toBe(generatedHashForEmptyObject);
  });

  it("should return a hash when given an object with a null 'partitionKey' key as parameter", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: null });
    expect(trivialKey).toBe(generatedHashForNullPartitionKey);
  });

  it("should return a hash when given an object with 'partitionKey: 0' key as parameter", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 0 });
    expect(trivialKey).toBe(generatedHashForZeroPartitionKey);
  });

  it("should return a hash when given an object with partitionKey: '' key as parameter", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "" });
    expect(trivialKey).toBe(generatedHashForEmptyStringPartitionKey);
  });

  it("should return a hash when given an object with 'partitionKey: false' key as parameter", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: false });
    expect(trivialKey).toBe(generatedHashForFalsePartitionKey);
  });

  it("should return a hash when given an object with 'partitionKey: NaN' key as parameter", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: NaN });
    expect(trivialKey).toBe(generatedHashForNaNPartitionKey);
  });

  it("should return the '0' when given an object with 'partitionKey: '0' as parameter", () => {
    const partitionKey = "0";
    const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey).toBe(partitionKey);
  });

  it("should return a stringfied number when given an object with a 'partitionKey' key containing a number", () => {
    const partitionKey = 123;
    const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey).toBe(String(partitionKey));
  });

  it("should return 'null' when given an object with a 'partitionKey: Infinity' as parameter", () => {
    const partitionKey = Infinity;
    const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey).toBe("null");
  });

  it("should return a stringfied number when given an object with a 'partitionKey' key containing a big number", () => {
    const partitionKey = 999999999;
    const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey).toBe(String(partitionKey));
  });

  // it("should return a stringfied number when given an object with a 'partitionKey' key containing a bigint", () => {
  //   const partitionKey = 999999999999999999999999999n;
  //   const trivialKey = deterministicPartitionKey({ partitionKey });
  //   expect(trivialKey).toBe(String(partitionKey));
  // });

  it("should return a hash when given an object with a 'partitionKey' key containing a big number", () => {
    const partitionKey = 'c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862';
    const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey).toBe(generatedHashForLargeStringPartitionKey);
  });
});
