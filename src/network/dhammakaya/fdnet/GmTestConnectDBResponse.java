/**
 * GmTestConnectDBResponse.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public class GmTestConnectDBResponse  implements java.io.Serializable {
    private java.lang.String gmTestConnectDBResult;

    public GmTestConnectDBResponse() {
    }

    public GmTestConnectDBResponse(
           java.lang.String gmTestConnectDBResult) {
           this.gmTestConnectDBResult = gmTestConnectDBResult;
    }


    /**
     * Gets the gmTestConnectDBResult value for this GmTestConnectDBResponse.
     * 
     * @return gmTestConnectDBResult
     */
    public java.lang.String getGmTestConnectDBResult() {
        return gmTestConnectDBResult;
    }


    /**
     * Sets the gmTestConnectDBResult value for this GmTestConnectDBResponse.
     * 
     * @param gmTestConnectDBResult
     */
    public void setGmTestConnectDBResult(java.lang.String gmTestConnectDBResult) {
        this.gmTestConnectDBResult = gmTestConnectDBResult;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof GmTestConnectDBResponse)) return false;
        GmTestConnectDBResponse other = (GmTestConnectDBResponse) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.gmTestConnectDBResult==null && other.getGmTestConnectDBResult()==null) || 
             (this.gmTestConnectDBResult!=null &&
              this.gmTestConnectDBResult.equals(other.getGmTestConnectDBResult())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getGmTestConnectDBResult() != null) {
            _hashCode += getGmTestConnectDBResult().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(GmTestConnectDBResponse.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", ">gmTestConnectDBResponse"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("gmTestConnectDBResult");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "gmTestConnectDBResult"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
