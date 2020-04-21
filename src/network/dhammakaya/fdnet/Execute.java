/**
 * Execute.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public class Execute  implements java.io.Serializable {
    private java.lang.String tinstrSqlCmd;

    private network.dhammakaya.fdnet.SqlParameter[] lSqlParameter;

    public Execute() {
    }

    public Execute(
           java.lang.String tinstrSqlCmd,
           network.dhammakaya.fdnet.SqlParameter[] lSqlParameter) {
           this.tinstrSqlCmd = tinstrSqlCmd;
           this.lSqlParameter = lSqlParameter;
    }


    /**
     * Gets the tinstrSqlCmd value for this Execute.
     * 
     * @return tinstrSqlCmd
     */
    public java.lang.String getTinstrSqlCmd() {
        return tinstrSqlCmd;
    }


    /**
     * Sets the tinstrSqlCmd value for this Execute.
     * 
     * @param tinstrSqlCmd
     */
    public void setTinstrSqlCmd(java.lang.String tinstrSqlCmd) {
        this.tinstrSqlCmd = tinstrSqlCmd;
    }


    /**
     * Gets the lSqlParameter value for this Execute.
     * 
     * @return lSqlParameter
     */
    public network.dhammakaya.fdnet.SqlParameter[] getLSqlParameter() {
        return lSqlParameter;
    }


    /**
     * Sets the lSqlParameter value for this Execute.
     * 
     * @param lSqlParameter
     */
    public void setLSqlParameter(network.dhammakaya.fdnet.SqlParameter[] lSqlParameter) {
        this.lSqlParameter = lSqlParameter;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Execute)) return false;
        Execute other = (Execute) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.tinstrSqlCmd==null && other.getTinstrSqlCmd()==null) || 
             (this.tinstrSqlCmd!=null &&
              this.tinstrSqlCmd.equals(other.getTinstrSqlCmd()))) &&
            ((this.lSqlParameter==null && other.getLSqlParameter()==null) || 
             (this.lSqlParameter!=null &&
              java.util.Arrays.equals(this.lSqlParameter, other.getLSqlParameter())));
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
        if (getTinstrSqlCmd() != null) {
            _hashCode += getTinstrSqlCmd().hashCode();
        }
        if (getLSqlParameter() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getLSqlParameter());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getLSqlParameter(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Execute.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", ">Execute"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("tinstrSqlCmd");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "tinstrSqlCmd"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("LSqlParameter");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "lSqlParameter"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SqlParameter"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SqlParameter"));
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
