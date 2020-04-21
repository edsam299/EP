/**
 * Select.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public class Select  implements java.io.Serializable {
    private java.lang.String tinstrTable;

    private java.lang.String tinstrSql;

    public Select() {
    }

    public Select(
           java.lang.String tinstrTable,
           java.lang.String tinstrSql) {
           this.tinstrTable = tinstrTable;
           this.tinstrSql = tinstrSql;
    }


    /**
     * Gets the tinstrTable value for this Select.
     * 
     * @return tinstrTable
     */
    public java.lang.String getTinstrTable() {
        return tinstrTable;
    }


    /**
     * Sets the tinstrTable value for this Select.
     * 
     * @param tinstrTable
     */
    public void setTinstrTable(java.lang.String tinstrTable) {
        this.tinstrTable = tinstrTable;
    }


    /**
     * Gets the tinstrSql value for this Select.
     * 
     * @return tinstrSql
     */
    public java.lang.String getTinstrSql() {
        return tinstrSql;
    }


    /**
     * Sets the tinstrSql value for this Select.
     * 
     * @param tinstrSql
     */
    public void setTinstrSql(java.lang.String tinstrSql) {
        this.tinstrSql = tinstrSql;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Select)) return false;
        Select other = (Select) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.tinstrTable==null && other.getTinstrTable()==null) || 
             (this.tinstrTable!=null &&
              this.tinstrTable.equals(other.getTinstrTable()))) &&
            ((this.tinstrSql==null && other.getTinstrSql()==null) || 
             (this.tinstrSql!=null &&
              this.tinstrSql.equals(other.getTinstrSql())));
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
        if (getTinstrTable() != null) {
            _hashCode += getTinstrTable().hashCode();
        }
        if (getTinstrSql() != null) {
            _hashCode += getTinstrSql().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Select.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", ">Select"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("tinstrTable");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "tinstrTable"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("tinstrSql");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "tinstrSql"));
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
