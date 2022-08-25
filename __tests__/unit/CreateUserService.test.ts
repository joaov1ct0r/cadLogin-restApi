describe("when create user service is called", () => {
  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  it("should sum 2 numbers", () => {
    const x = 2;

    const y = 2;

    const result = x + y;

    expect(result).toBe(4);
  });
});
