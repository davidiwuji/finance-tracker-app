-- Seed data for the finance tracker app

-- Insert sample assets
INSERT INTO assets (name, type, value, growth_rate) VALUES
('Savings Account', 'Cash', 15000.00, 0.5),
('Investment Portfolio', 'Stocks', 28450.00, 8.2),
('401k', 'Retirement', 45000.00, 6.5),
('Real Estate', 'Property', 250000.00, 3.2),
('Emergency Fund', 'Cash', 10000.00, 0.1);

-- Insert sample liabilities
INSERT INTO liabilities (name, type, amount, interest_rate, monthly_payment) VALUES
('Mortgage', 'Home Loan', 180000.00, 3.5, 1200.00),
('Car Loan', 'Auto Loan', 15000.00, 4.2, 350.00),
('Credit Card', 'Credit Card', 2500.00, 18.9, 100.00),
('Student Loan', 'Education', 25000.00, 5.5, 280.00);

-- Insert sample budgets
INSERT INTO budgets (category, amount) VALUES
('Food', 800.00),
('Transport', 400.00),
('Bills', 1200.00),
('Entertainment', 300.00),
('Misc', 200.00);

-- Insert sample expenses
INSERT INTO expenses (description, amount, category, date) VALUES
('Grocery Shopping', 120.50, 'Food', '2024-01-15'),
('Gas Station', 45.00, 'Transport', '2024-01-14'),
('Electric Bill', 85.00, 'Bills', '2024-01-13'),
('Movie Tickets', 25.00, 'Entertainment', '2024-01-12'),
('Coffee Shop', 12.50, 'Food', '2024-01-11'),
('Uber Ride', 18.00, 'Transport', '2024-01-10'),
('Internet Bill', 60.00, 'Bills', '2024-01-09'),
('Restaurant Dinner', 75.00, 'Food', '2024-01-08');

-- Insert sample trading strategies
INSERT INTO trading_strategies (name, description, rules) VALUES
('Momentum Trading', 'Buy stocks showing strong upward momentum', ARRAY['Only buy above 20-day MA', 'Set stop loss at 5%', 'Take profit at 15%']),
('Value Investing', 'Buy undervalued stocks for long-term growth', ARRAY['P/E ratio below 15', 'Debt-to-equity below 0.5', 'Hold for minimum 1 year']),
('Swing Trading', 'Capture short to medium-term price swings', ARRAY['Use RSI for entry signals', 'Hold for 3-10 days', 'Risk max 2% per trade']);

-- Insert sample trades
INSERT INTO trades (symbol, type, quantity, entry_price, exit_price, entry_date, exit_date, strategy_id, notes, pnl, status) VALUES
('AAPL', 'buy', 10, 185.50, 195.20, '2024-01-10 09:30:00', '2024-01-15 15:30:00', (SELECT id FROM trading_strategies WHERE name = 'Momentum Trading'), 'Strong earnings report', 97.00, 'closed'),
('MSFT', 'buy', 5, 420.00, NULL, '2024-01-12 10:15:00', NULL, (SELECT id FROM trading_strategies WHERE name = 'Value Investing'), 'Good entry point', NULL, 'open'),
('TSLA', 'buy', 8, 240.00, 225.00, '2024-01-08 11:00:00', '2024-01-11 14:00:00', (SELECT id FROM trading_strategies WHERE name = 'Swing Trading'), 'Failed breakout', -120.00, 'closed');

-- Insert sample net worth snapshots
INSERT INTO net_worth_snapshots (date, total_assets, total_liabilities, net_worth) VALUES
('2024-01-01', 340000.00, 220000.00, 120000.00),
('2023-12-01', 335000.00, 222000.00, 113000.00),
('2023-11-01', 330000.00, 224000.00, 106000.00),
('2023-10-01', 325000.00, 226000.00, 99000.00),
('2023-09-01', 320000.00, 228000.00, 92000.00),
('2023-08-01', 315000.00, 230000.00, 85000.00);
