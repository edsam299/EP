/**
 * SelectParaResponse.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public class SelectParaResponse  implements java.io.Serializable {
    private network.dhammakaya.fdnet.SelectParaResponseSelectParaResult selectParaResult;

    public SelectParaResponse() {
    }

    public SelectParaResponse(
           network.dhammakaya.fdnet.SelectParaResponseSelectParaResult selectParaResult) {
           this.selectParaResult = selectParaResult;
    }


    /**
     * Gets the selectParaResult value for this SelectParaResponse.
     * 
     * @return selectParaResult
     */
    public network.dhammakaya.fdnet.SelectParaResponseSelectParaResult getSelectParaResult() {
        return selectParaResult;
    }


    /**
     * Sets the selectParaResult value for this SelectParaResponse.
     * 
     * @param selectParaResult
     */
    public void setSelectParaResult(network.dhammakaya.fdnet.SelectParaResponseSelectParaResult selectParaResult) {
        this.selectParaResult = selectParaResult;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof SelectParaResponse)) return false;
        SelectParaResponse other = (SelectParaResponse) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.selectParaResult==null && other.getSelectParaResult()==null) || 
             (this.selectParaResult!=null &&
              this.selectParaResult.equals(other.getSelectParaResult())));
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
        if (getSelectParaResult() != null) {
            _hashCode += getSelectParaResult().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(SelectParaResponse.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", ">SelectParaResponse"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("selectParaResult");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SelectParaResult"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", ">>SelectParaResponse>SelectParaResult"));
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
