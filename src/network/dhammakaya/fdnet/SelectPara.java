/**
 * SelectPara.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public class SelectPara  implements java.io.Serializable {
    private java.lang.String tableName;

    private java.lang.String sqlCmd;

    private network.dhammakaya.fdnet.SqlParameter[] myPara;

    public SelectPara() {
    }

    public SelectPara(
           java.lang.String tableName,
           java.lang.String sqlCmd,
           network.dhammakaya.fdnet.SqlParameter[] myPara) {
           this.tableName = tableName;
           this.sqlCmd = sqlCmd;
           this.myPara = myPara;
    }


    /**
     * Gets the tableName value for this SelectPara.
     * 
     * @return tableName
     */
    public java.lang.String getTableName() {
        return tableName;
    }


    /**
     * Sets the tableName value for this SelectPara.
     * 
     * @param tableName
     */
    public void setTableName(java.lang.String tableName) {
        this.tableName = tableName;
    }


    /**
     * Gets the sqlCmd value for this SelectPara.
     * 
     * @return sqlCmd
     */
    public java.lang.String getSqlCmd() {
        return sqlCmd;
    }


    /**
     * Sets the sqlCmd value for this SelectPara.
     * 
     * @param sqlCmd
     */
    public void setSqlCmd(java.lang.String sqlCmd) {
        this.sqlCmd = sqlCmd;
    }


    /**
     * Gets the myPara value for this SelectPara.
     * 
     * @return myPara
     */
    public network.dhammakaya.fdnet.SqlParameter[] getMyPara() {
        return myPara;
    }


    /**
     * Sets the myPara value for this SelectPara.
     * 
     * @param myPara
     */
    public void setMyPara(network.dhammakaya.fdnet.SqlParameter[] myPara) {
        this.myPara = myPara;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof SelectPara)) return false;
        SelectPara other = (SelectPara) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.tableName==null && other.getTableName()==null) || 
             (this.tableName!=null &&
              this.tableName.equals(other.getTableName()))) &&
            ((this.sqlCmd==null && other.getSqlCmd()==null) || 
             (this.sqlCmd!=null &&
              this.sqlCmd.equals(other.getSqlCmd()))) &&
            ((this.myPara==null && other.getMyPara()==null) || 
             (this.myPara!=null &&
              java.util.Arrays.equals(this.myPara, other.getMyPara())));
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
        if (getTableName() != null) {
            _hashCode += getTableName().hashCode();
        }
        if (getSqlCmd() != null) {
            _hashCode += getSqlCmd().hashCode();
        }
        if (getMyPara() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getMyPara());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getMyPara(), i);
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
        new org.apache.axis.description.TypeDesc(SelectPara.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", ">SelectPara"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("tableName");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "TableName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sqlCmd");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SqlCmd"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("myPara");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "MyPara"));
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
