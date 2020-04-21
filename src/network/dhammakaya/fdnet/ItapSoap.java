/**
 * ItapSoap.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public interface ItapSoap extends java.rmi.Remote {
    public java.lang.String helloWorld() throws java.rmi.RemoteException;
    public network.dhammakaya.fdnet.SelectParaResponseSelectParaResult selectPara(java.lang.String tableName, java.lang.String sqlCmd, network.dhammakaya.fdnet.SqlParameter[] myPara) throws java.rmi.RemoteException;
    public network.dhammakaya.fdnet.SelectResponseSelectResult select(java.lang.String tinstrTable, java.lang.String tinstrSql) throws java.rmi.RemoteException;
    public java.lang.String gmTestConnectDB() throws java.rmi.RemoteException;
    public boolean gmGenInsertByTable(java.lang.String tinstrTable, network.dhammakaya.fdnet.GmGenInsertByTableTinImportDt tinImportDt) throws java.rmi.RemoteException;
    public boolean gmExecute(java.lang.String tinstrSqlCmd) throws java.rmi.RemoteException;
    public boolean execute(java.lang.String tinstrSqlCmd, network.dhammakaya.fdnet.SqlParameter[] lSqlParameter) throws java.rmi.RemoteException;
    public void update(network.dhammakaya.fdnet.UpdateDataTable dataTable, java.lang.String keyColumn) throws java.rmi.RemoteException;
    public boolean gmConfirmExit() throws java.rmi.RemoteException;
    public int numRows(java.lang.String tinstrSqlCmd) throws java.rmi.RemoteException;
    public void pmBulkCopy(network.dhammakaya.fdnet.PmBulkCopyDataTable dataTable, java.lang.String destinationTbl, int batchSize) throws java.rmi.RemoteException;
    public java.lang.String passEncrypt(java.lang.String tPlaintext) throws java.rmi.RemoteException;
    public java.lang.String passDecrypt(java.lang.String ciphertext) throws java.rmi.RemoteException;
}
