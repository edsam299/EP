/**
 * ItapLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

import java.util.Properties;

import ukitsd.editing.connection.FileProperties;

public class ItapLocator extends org.apache.axis.client.Service implements network.dhammakaya.fdnet.Itap {
    static Properties properties=FileProperties.getInstance().getConfigProperties();
    public ItapLocator() {
    }

    
    public ItapLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public ItapLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

   
    // Use to get a proxy class for itapSoap
    
    private java.lang.String itapSoap_address = properties.getProperty("WS_URL");
    
    public java.lang.String getitapSoapAddress() {
        return itapSoap_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String itapSoapWSDDServiceName = "itapSoap";

    public java.lang.String getitapSoapWSDDServiceName() {
        return itapSoapWSDDServiceName;
    }

    public void setitapSoapWSDDServiceName(java.lang.String name) {
        itapSoapWSDDServiceName = name;
    }

    public network.dhammakaya.fdnet.ItapSoap getitapSoap() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(itapSoap_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getitapSoap(endpoint);
    }

    public network.dhammakaya.fdnet.ItapSoap getitapSoap(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            network.dhammakaya.fdnet.ItapSoapStub _stub = new network.dhammakaya.fdnet.ItapSoapStub(portAddress, this);
            _stub.setPortName(getitapSoapWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setitapSoapEndpointAddress(java.lang.String address) {
        itapSoap_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (network.dhammakaya.fdnet.ItapSoap.class.isAssignableFrom(serviceEndpointInterface)) {
                network.dhammakaya.fdnet.ItapSoapStub _stub = new network.dhammakaya.fdnet.ItapSoapStub(new java.net.URL(itapSoap_address), this);
                _stub.setPortName(getitapSoapWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("itapSoap".equals(inputPortName)) {
            return getitapSoap();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "itap");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "itapSoap"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("itapSoap".equals(portName)) {
            setitapSoapEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
