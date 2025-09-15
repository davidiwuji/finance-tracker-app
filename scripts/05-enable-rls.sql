-- Enable Row Level Security on all tables
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE liabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE trading_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE net_worth_snapshots ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for assets
CREATE POLICY "Users can only see their own assets" ON assets
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for liabilities
CREATE POLICY "Users can only see their own liabilities" ON liabilities
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for expenses
CREATE POLICY "Users can only see their own expenses" ON expenses
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for budgets
CREATE POLICY "Users can only see their own budgets" ON budgets
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for trading strategies
CREATE POLICY "Users can only see their own trading strategies" ON trading_strategies
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for trades
CREATE POLICY "Users can only see their own trades" ON trades
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for net worth snapshots
CREATE POLICY "Users can only see their own net worth snapshots" ON net_worth_snapshots
  FOR ALL USING (auth.uid() = user_id);
