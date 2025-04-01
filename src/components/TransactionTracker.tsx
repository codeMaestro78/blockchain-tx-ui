import React, { useState, useEffect } from 'react';
import { Web3 } from 'web3';
import './TransactionTracker.css';

interface TransactionTrackerProps {
  txHash: string;
  providerUrl: string;
  refreshInterval?: number;
  onStatusChange?: (status: string) => void;
}

const TransactionTracker: React.FC<TransactionTrackerProps> = ({ 
  txHash, 
  providerUrl,
  refreshInterval = 5000,
  onStatusChange
}) => {
  const [status, setStatus] = useState<string>('Pending');
  const [gas, setGas] = useState<number | null>(null);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const web3 = new Web3(providerUrl);
    
    const checkTransaction = async () => {
      if (!txHash) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const receipt = await web3.eth.getTransactionReceipt(txHash);
        
        if (receipt && isMounted) {
          const newStatus = receipt.status ? 'Success' : 'Failed';
          setStatus(newStatus);
          setGas(Number(receipt.gasUsed));
          setBlockNumber(Number(receipt.blockNumber));
          
          if (onStatusChange) {
            onStatusChange(newStatus);
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching transaction:', error);
          setError('Failed to fetch transaction details');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkTransaction();
    const interval = setInterval(checkTransaction, refreshInterval);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [txHash, providerUrl, refreshInterval, onStatusChange]);

  return (
    <div className="transaction-tracker">
      <h3>Transaction Status</h3>
      
      {loading && status === 'Pending' && <p className="loading">Loading transaction data...</p>}
      
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <p>Status: <span className={status.toLowerCase()}>{status}</span></p>
          {gas !== null && <p>Gas Used: {gas}</p>}
          {blockNumber !== null && <p>Block Number: {blockNumber}</p>}
          <p className="tx-hash">TX Hash: <span title={txHash}>{txHash.substring(0, 10)}...{txHash.substring(txHash.length - 8)}</span></p>
        </>
      )}
    </div>
  );
};

export default TransactionTracker;