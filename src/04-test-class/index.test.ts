import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const lodash = jest.requireActual('lodash');

const initialBalance = 100;
const amount = 20;
const bankAccount = getBankAccount(initialBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(bankAccount).toEqual({ _balance: initialBalance });
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const overBalance = () => bankAccount.withdraw(1000);
    expect(overBalance).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccount.transfer(150, bankAccount);
    }).toThrowError(TransferFailedError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(5, bankAccount);
    }).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const sum = amount + initialBalance;
    bankAccount.deposit(amount);

    const balance = bankAccount.getBalance();
    expect(balance).toBe(sum);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(amount);
    const balance = bankAccount.getBalance();
    expect(balance).toBe(initialBalance);
  });

  test('should transfer money', () => {
    const newAccount = getBankAccount(0);
    const balance = bankAccount.transfer(amount, newAccount).getBalance();
    expect(balance).toEqual(initialBalance - amount);
    expect(newAccount.getBalance()).toEqual(amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 10);
    const result = await bankAccount.fetchBalance();
    expect(result).toEqual(10);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 10);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toEqual(10);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn(() => 0);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
