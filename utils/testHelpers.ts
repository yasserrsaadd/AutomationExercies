export function generateRandomEmail(): string {
  return `qatest_${Date.now()}@example.com`;
}

export function generateRandomName(): string {
  return `TestUser${Math.floor(Math.random() * 10000)}`;
}