-- Insert seed data for testing (only if no data exists)
-- This will create sample data for organizations that have no existing data

DO $$
DECLARE
    org_record RECORD;
    default_org_id UUID;
    sample_account_id UUID;
    sample_category_income_id UUID;
    sample_category_expense_id UUID;
    sample_customer_id UUID;
    sample_vendor_id UUID;
BEGIN
    -- Get organizations that have no accounts (meaning they're empty)
    FOR org_record IN 
        SELECT o.id 
        FROM organizations o 
        LEFT JOIN accounts a ON o.id = a.org_id 
        WHERE a.id IS NULL
        LIMIT 1
    LOOP
        default_org_id := org_record.id;
        
        -- Insert default accounts
        INSERT INTO accounts (org_id, name, type, current_balance) VALUES
        (default_org_id, 'Conta Corrente Principal', 'bank', 15420.50),
        (default_org_id, 'Carteira Digital', 'wallet', 2850.30)
        RETURNING id INTO sample_account_id;
        
        -- Insert default categories
        INSERT INTO categories (org_id, name, kind) VALUES
        (default_org_id, 'Vendas Online', 'income'),
        (default_org_id, 'Comissões ML', 'expense'),
        (default_org_id, 'Marketing Digital', 'expense'),
        (default_org_id, 'Fornecedores', 'expense')
        RETURNING id INTO sample_category_income_id;
        
        SELECT id INTO sample_category_expense_id FROM categories 
        WHERE org_id = default_org_id AND kind = 'expense' LIMIT 1;
        
        -- Insert sample contacts
        INSERT INTO contacts (org_id, type, name, cnpj, email, phone, city, state) VALUES
        (default_org_id, 'customer', 'João Silva', '12345678901', 'joao@email.com', '(11) 99999-1234', 'São Paulo', 'SP'),
        (default_org_id, 'customer', 'Maria Santos', '98765432102', 'maria@email.com', '(21) 88888-5678', 'Rio de Janeiro', 'RJ'),
        (default_org_id, 'customer', 'Pedro Costa', '45678912303', 'pedro@email.com', '(31) 77777-9876', 'Belo Horizonte', 'MG'),
        (default_org_id, 'vendor', 'Fornecedor ABC Ltda', '11222333000144', 'contato@abc.com', '(11) 3333-4444', 'São Paulo', 'SP'),
        (default_org_id, 'vendor', 'Distribuidora XYZ', '55666777000155', 'vendas@xyz.com', '(21) 5555-6666', 'Rio de Janeiro', 'RJ'),
        (default_org_id, 'vendor', 'Logística Total', '99888777000166', 'operacao@total.com', '(31) 9999-8888', 'Belo Horizonte', 'MG')
        RETURNING id INTO sample_customer_id;
        
        SELECT id INTO sample_vendor_id FROM contacts 
        WHERE org_id = default_org_id AND type = 'vendor' LIMIT 1;
        
        -- Insert sample transactions (last 30 days)
        INSERT INTO transactions (org_id, date, kind, description, amount_gross, fees, status, account_id, contact_id, platform, category_id) VALUES
        (default_org_id, CURRENT_DATE - INTERVAL '1 day', 'inflow', 'Venda Mercado Livre #ML001', 285.90, 28.59, 'received', sample_account_id, sample_customer_id, 'Mercado Livre', sample_category_income_id),
        (default_org_id, CURRENT_DATE - INTERVAL '2 days', 'inflow', 'Venda Shopee #SP002', 150.00, 15.00, 'received', sample_account_id, sample_customer_id, 'Shopee', sample_category_income_id),
        (default_org_id, CURRENT_DATE - INTERVAL '3 days', 'outflow', 'Pagamento Fornecedor ABC', 420.00, 0, 'paid', sample_account_id, sample_vendor_id, null, sample_category_expense_id),
        (default_org_id, CURRENT_DATE - INTERVAL '5 days', 'inflow', 'Venda Mercado Livre #ML003', 320.50, 32.05, 'received', sample_account_id, sample_customer_id, 'Mercado Livre', sample_category_income_id),
        (default_org_id, CURRENT_DATE - INTERVAL '7 days', 'inflow', 'Venda Shein #SH001', 89.90, 8.99, 'received', sample_account_id, sample_customer_id, 'Shein', sample_category_income_id),
        (default_org_id, CURRENT_DATE - INTERVAL '10 days', 'outflow', 'Anúncios Facebook', 250.00, 0, 'paid', sample_account_id, null, 'Facebook', sample_category_expense_id),
        (default_org_id, CURRENT_DATE - INTERVAL '12 days', 'inflow', 'Venda Mercado Livre #ML004', 445.80, 44.58, 'received', sample_account_id, sample_customer_id, 'Mercado Livre', sample_category_income_id),
        (default_org_id, CURRENT_DATE - INTERVAL '15 days', 'inflow', 'Venda Shopee #SP005', 198.50, 19.85, 'received', sample_account_id, sample_customer_id, 'Shopee', sample_category_income_id),
        (default_org_id, CURRENT_DATE - INTERVAL '18 days', 'outflow', 'Pagamento Logística', 180.00, 0, 'paid', sample_account_id, sample_vendor_id, null, sample_category_expense_id),
        (default_org_id, CURRENT_DATE - INTERVAL '20 days', 'inflow', 'Venda Mercado Livre #ML006', 675.30, 67.53, 'received', sample_account_id, sample_customer_id, 'Mercado Livre', sample_category_income_id),
        (default_org_id, CURRENT_DATE - INTERVAL '22 days', 'inflow', 'Venda Shein #SH002', 120.00, 12.00, 'received', sample_account_id, sample_customer_id, 'Shein', sample_category_income_id),
        (default_org_id, CURRENT_DATE - INTERVAL '25 days', 'outflow', 'Fornecedor XYZ', 380.50, 0, 'paid', sample_account_id, sample_vendor_id, null, sample_category_expense_id);
        
        -- Insert sample bills
        INSERT INTO bills (org_id, board, description, contact_id, total_amount, due_date, category_id, status) VALUES
        (default_org_id, 'receivables', 'Pagamento ML pendente #ML007', sample_customer_id, 450.00, CURRENT_DATE + INTERVAL '3 days', sample_category_income_id, 'pending'),
        (default_org_id, 'receivables', 'Venda Shopee aguardando', sample_customer_id, 280.30, CURRENT_DATE + INTERVAL '5 days', sample_category_income_id, 'pending'),
        (default_org_id, 'payables', 'Fornecedor ABC - Fatura 123', sample_vendor_id, 650.00, CURRENT_DATE + INTERVAL '7 days', sample_category_expense_id, 'pending'),
        (default_org_id, 'payables', 'Anúncios Google Ads', null, 300.00, CURRENT_DATE + INTERVAL '10 days', sample_category_expense_id, 'pending'),
        (default_org_id, 'receivables', 'Mercado Livre #ML008', sample_customer_id, 385.90, CURRENT_DATE + INTERVAL '12 days', sample_category_income_id, 'pending'),
        (default_org_id, 'payables', 'Logística Total - Frete', sample_vendor_id, 220.00, CURRENT_DATE + INTERVAL '15 days', sample_category_expense_id, 'pending');
        
        -- Insert sample calendar events
        INSERT INTO calendar_events (org_id, title, datetime, type, notes) VALUES
        (default_org_id, 'Reunião com fornecedor ABC', CURRENT_DATE + INTERVAL '2 days' + TIME '14:00', 'meeting', 'Negociar preços para próximo trimestre'),
        (default_org_id, 'Pagamento Fornecedor XYZ', CURRENT_DATE + INTERVAL '7 days' + TIME '10:00', 'payment', 'Transferência bancária agendada'),
        (default_org_id, 'Recebimento ML', CURRENT_DATE + INTERVAL '3 days' + TIME '09:00', 'receivable', 'Venda #ML007'),
        (default_org_id, 'Análise de Performance', CURRENT_DATE + INTERVAL '5 days' + TIME '16:00', 'meeting', 'Revisar KPIs do mês');
        
        -- Insert sample activity logs
        INSERT INTO activity_logs (org_id, message, kind, amount) VALUES
        (default_org_id, 'Venda realizada no Mercado Livre', 'in', 285.90),
        (default_org_id, 'Pagamento efetuado para Fornecedor ABC', 'out', 420.00),
        (default_org_id, 'Nova venda registrada na Shopee', 'in', 150.00),
        (default_org_id, 'Cliente João Silva cadastrado', 'info', null),
        (default_org_id, 'Venda Shein processada', 'in', 89.90),
        (default_org_id, 'Pagamento de anúncios realizado', 'out', 250.00),
        (default_org_id, 'Fornecedor XYZ atualizado', 'info', null),
        (default_org_id, 'Recebimento Mercado Livre confirmado', 'in', 445.80),
        (default_org_id, 'Nova conta a pagar criada', 'info', null),
        (default_org_id, 'Venda Shopee finalizada', 'in', 198.50);
        
        -- Insert sample integrations
        INSERT INTO integrations (org_id, provider, status, last_sync_at) VALUES
        (default_org_id, 'Mercado Livre', 'disconnected', null),
        (default_org_id, 'Shopee', 'disconnected', null),
        (default_org_id, 'Shein', 'disconnected', null),
        (default_org_id, 'Bling', 'disconnected', null),
        (default_org_id, 'Tiny', 'disconnected', null);
        
        RAISE NOTICE 'Sample data inserted for organization: %', default_org_id;
    END LOOP;
    
    IF NOT FOUND THEN
        RAISE NOTICE 'No empty organizations found. Seed data not inserted.';
    END IF;
END $$;