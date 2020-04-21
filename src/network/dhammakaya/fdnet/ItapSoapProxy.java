package network.dhammakaya.fdnet;

public class ItapSoapProxy implements network.dhammakaya.fdnet.ItapSoap {
  private String _endpoint = null;
  private network.dhammakaya.fdnet.ItapSoap itapSoap = null;
  
  public ItapSoapProxy() {
    _initItapSoapProxy();
  }
  
  public ItapSoapProxy(String endpoint) {
    _endpoint = endpoint;
    _initItapSoapProxy();
  }
  
  private void _initItapSoapProxy() {
    try {
      itapSoap = (new network.dhammakaya.fdnet.ItapLocator()).getitapSoap();
      if (itapSoap != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)itapSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)itapSoap)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (itapSoap != null)
      ((javax.xml.rpc.Stub)itapSoap)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public network.dhammakaya.fdnet.ItapSoap getItapSoap() {
    if (itapSoap == null)
      _initItapSoapProxy();
    return itapSoap;
  }
  
  public java.lang.String helloWorld() throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    return itapSoap.helloWorld();
  }
  
  public network.dhammakaya.fdnet.SelectParaResponseSelectParaResult selectPara(java.lang.String tableName, java.lang.String sqlCmd, network.dhammakaya.fdnet.SqlParameter[] myPara) throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    return itapSoap.selectPara(tableName, sqlCmd, myPara);
  }
  
  public network.dhammakaya.fdnet.SelectResponseSelectResult select(java.lang.String tinstrTable, java.lang.String tinstrSql) throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    return itapSoap.select(tinstrTable, tinstrSql);
  }
  
  public java.lang.String gmTestConnectDB() throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    return itapSoap.gmTestConnectDB();
  }
  
  public boolean gmGenInsertByTable(java.lang.String tinstrTable, network.dhammakaya.fdnet.GmGenInsertByTableTinImportDt tinImportDt) throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    return itapSoap.gmGenInsertByTable(tinstrTable, tinImportDt);
  }
  
  public boolean gmExecute(java.lang.String tinstrSqlCmd) throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    return itapSoap.gmExecute(tinstrSqlCmd);
  }
  
  public boolean execute(java.lang.String tinstrSqlCmd, network.dhammakaya.fdnet.SqlParameter[] lSqlParameter) throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    return itapSoap.execute(tinstrSqlCmd, lSqlParameter);
  }
  
  public void update(network.dhammakaya.fdnet.UpdateDataTable dataTable, java.lang.String keyColumn) throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    itapSoap.update(dataTable, keyColumn);
  }
  
  public boolean gmConfirmExit() throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    return itapSoap.gmConfirmExit();
  }
  
  public int numRows(java.lang.String tinstrSqlCmd) throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    return itapSoap.numRows(tinstrSqlCmd);
  }
  
  public void pmBulkCopy(network.dhammakaya.fdnet.PmBulkCopyDataTable dataTable, java.lang.String destinationTbl, int batchSize) throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    itapSoap.pmBulkCopy(dataTable, destinationTbl, batchSize);
  }
  
  public java.lang.String passEncrypt(java.lang.String tPlaintext) throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    return itapSoap.passEncrypt(tPlaintext);
  }
  
  public java.lang.String passDecrypt(java.lang.String ciphertext) throws java.rmi.RemoteException{
    if (itapSoap == null)
      _initItapSoapProxy();
    return itapSoap.passDecrypt(ciphertext);
  }
  
  
}