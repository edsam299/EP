/**
 * SqlParameter.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package network.dhammakaya.fdnet;

public class SqlParameter  extends network.dhammakaya.fdnet.DbParameter  implements java.io.Serializable {
    private java.lang.String[] compareInfo;

    private java.lang.String xmlSchemaCollectionDatabase;

    private java.lang.String xmlSchemaCollectionOwningSchema;

    private java.lang.String xmlSchemaCollectionName;

    private java.lang.Boolean forceColumnEncryption;

    private int localeId;

    private network.dhammakaya.fdnet.SqlDbType sqlDbType;

    private java.lang.Object sqlValue;

    private java.lang.String udtTypeName;

    private java.lang.String typeName;

    private int offset;

    public SqlParameter() {
    }

    public SqlParameter(
           network.dhammakaya.fdnet.DbType dbType,
           network.dhammakaya.fdnet.ParameterDirection direction,
           boolean isNullable,
           java.lang.String parameterName,
           org.apache.axis.types.UnsignedByte precision,
           org.apache.axis.types.UnsignedByte scale,
           int size,
           java.lang.String sourceColumn,
           java.lang.Boolean sourceColumnNullMapping,
           network.dhammakaya.fdnet.DataRowVersion sourceVersion,
           java.lang.Object value,
           java.lang.String[] compareInfo,
           java.lang.String xmlSchemaCollectionDatabase,
           java.lang.String xmlSchemaCollectionOwningSchema,
           java.lang.String xmlSchemaCollectionName,
           java.lang.Boolean forceColumnEncryption,
           int localeId,
           network.dhammakaya.fdnet.SqlDbType sqlDbType,
           java.lang.Object sqlValue,
           java.lang.String udtTypeName,
           java.lang.String typeName,
           int offset) {
        super(
            dbType,
            direction,
            isNullable,
            parameterName,
            precision,
            scale,
            size,
            sourceColumn,
            sourceColumnNullMapping,
            sourceVersion,
            value);
        this.compareInfo = compareInfo;
        this.xmlSchemaCollectionDatabase = xmlSchemaCollectionDatabase;
        this.xmlSchemaCollectionOwningSchema = xmlSchemaCollectionOwningSchema;
        this.xmlSchemaCollectionName = xmlSchemaCollectionName;
        this.forceColumnEncryption = forceColumnEncryption;
        this.localeId = localeId;
        this.sqlDbType = sqlDbType;
        this.sqlValue = sqlValue;
        this.udtTypeName = udtTypeName;
        this.typeName = typeName;
        this.offset = offset;
    }


    /**
     * Gets the compareInfo value for this SqlParameter.
     * 
     * @return compareInfo
     */
    public java.lang.String[] getCompareInfo() {
        return compareInfo;
    }


    /**
     * Sets the compareInfo value for this SqlParameter.
     * 
     * @param compareInfo
     */
    public void setCompareInfo(java.lang.String[] compareInfo) {
        this.compareInfo = compareInfo;
    }


    /**
     * Gets the xmlSchemaCollectionDatabase value for this SqlParameter.
     * 
     * @return xmlSchemaCollectionDatabase
     */
    public java.lang.String getXmlSchemaCollectionDatabase() {
        return xmlSchemaCollectionDatabase;
    }


    /**
     * Sets the xmlSchemaCollectionDatabase value for this SqlParameter.
     * 
     * @param xmlSchemaCollectionDatabase
     */
    public void setXmlSchemaCollectionDatabase(java.lang.String xmlSchemaCollectionDatabase) {
        this.xmlSchemaCollectionDatabase = xmlSchemaCollectionDatabase;
    }


    /**
     * Gets the xmlSchemaCollectionOwningSchema value for this SqlParameter.
     * 
     * @return xmlSchemaCollectionOwningSchema
     */
    public java.lang.String getXmlSchemaCollectionOwningSchema() {
        return xmlSchemaCollectionOwningSchema;
    }


    /**
     * Sets the xmlSchemaCollectionOwningSchema value for this SqlParameter.
     * 
     * @param xmlSchemaCollectionOwningSchema
     */
    public void setXmlSchemaCollectionOwningSchema(java.lang.String xmlSchemaCollectionOwningSchema) {
        this.xmlSchemaCollectionOwningSchema = xmlSchemaCollectionOwningSchema;
    }


    /**
     * Gets the xmlSchemaCollectionName value for this SqlParameter.
     * 
     * @return xmlSchemaCollectionName
     */
    public java.lang.String getXmlSchemaCollectionName() {
        return xmlSchemaCollectionName;
    }


    /**
     * Sets the xmlSchemaCollectionName value for this SqlParameter.
     * 
     * @param xmlSchemaCollectionName
     */
    public void setXmlSchemaCollectionName(java.lang.String xmlSchemaCollectionName) {
        this.xmlSchemaCollectionName = xmlSchemaCollectionName;
    }


    /**
     * Gets the forceColumnEncryption value for this SqlParameter.
     * 
     * @return forceColumnEncryption
     */
    public java.lang.Boolean getForceColumnEncryption() {
        return forceColumnEncryption;
    }


    /**
     * Sets the forceColumnEncryption value for this SqlParameter.
     * 
     * @param forceColumnEncryption
     */
    public void setForceColumnEncryption(java.lang.Boolean forceColumnEncryption) {
        this.forceColumnEncryption = forceColumnEncryption;
    }


    /**
     * Gets the localeId value for this SqlParameter.
     * 
     * @return localeId
     */
    public int getLocaleId() {
        return localeId;
    }


    /**
     * Sets the localeId value for this SqlParameter.
     * 
     * @param localeId
     */
    public void setLocaleId(int localeId) {
        this.localeId = localeId;
    }


    /**
     * Gets the sqlDbType value for this SqlParameter.
     * 
     * @return sqlDbType
     */
    public network.dhammakaya.fdnet.SqlDbType getSqlDbType() {
        return sqlDbType;
    }


    /**
     * Sets the sqlDbType value for this SqlParameter.
     * 
     * @param sqlDbType
     */
    public void setSqlDbType(network.dhammakaya.fdnet.SqlDbType sqlDbType) {
        this.sqlDbType = sqlDbType;
    }


    /**
     * Gets the sqlValue value for this SqlParameter.
     * 
     * @return sqlValue
     */
    public java.lang.Object getSqlValue() {
        return sqlValue;
    }


    /**
     * Sets the sqlValue value for this SqlParameter.
     * 
     * @param sqlValue
     */
    public void setSqlValue(java.lang.Object sqlValue) {
        this.sqlValue = sqlValue;
    }


    /**
     * Gets the udtTypeName value for this SqlParameter.
     * 
     * @return udtTypeName
     */
    public java.lang.String getUdtTypeName() {
        return udtTypeName;
    }


    /**
     * Sets the udtTypeName value for this SqlParameter.
     * 
     * @param udtTypeName
     */
    public void setUdtTypeName(java.lang.String udtTypeName) {
        this.udtTypeName = udtTypeName;
    }


    /**
     * Gets the typeName value for this SqlParameter.
     * 
     * @return typeName
     */
    public java.lang.String getTypeName() {
        return typeName;
    }


    /**
     * Sets the typeName value for this SqlParameter.
     * 
     * @param typeName
     */
    public void setTypeName(java.lang.String typeName) {
        this.typeName = typeName;
    }


    /**
     * Gets the offset value for this SqlParameter.
     * 
     * @return offset
     */
    public int getOffset() {
        return offset;
    }


    /**
     * Sets the offset value for this SqlParameter.
     * 
     * @param offset
     */
    public void setOffset(int offset) {
        this.offset = offset;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof SqlParameter)) return false;
        SqlParameter other = (SqlParameter) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = super.equals(obj) && 
            ((this.compareInfo==null && other.getCompareInfo()==null) || 
             (this.compareInfo!=null &&
              java.util.Arrays.equals(this.compareInfo, other.getCompareInfo()))) &&
            ((this.xmlSchemaCollectionDatabase==null && other.getXmlSchemaCollectionDatabase()==null) || 
             (this.xmlSchemaCollectionDatabase!=null &&
              this.xmlSchemaCollectionDatabase.equals(other.getXmlSchemaCollectionDatabase()))) &&
            ((this.xmlSchemaCollectionOwningSchema==null && other.getXmlSchemaCollectionOwningSchema()==null) || 
             (this.xmlSchemaCollectionOwningSchema!=null &&
              this.xmlSchemaCollectionOwningSchema.equals(other.getXmlSchemaCollectionOwningSchema()))) &&
            ((this.xmlSchemaCollectionName==null && other.getXmlSchemaCollectionName()==null) || 
             (this.xmlSchemaCollectionName!=null &&
              this.xmlSchemaCollectionName.equals(other.getXmlSchemaCollectionName()))) &&
            ((this.forceColumnEncryption==null && other.getForceColumnEncryption()==null) || 
             (this.forceColumnEncryption!=null &&
              this.forceColumnEncryption.equals(other.getForceColumnEncryption()))) &&
            this.localeId == other.getLocaleId() &&
            ((this.sqlDbType==null && other.getSqlDbType()==null) || 
             (this.sqlDbType!=null &&
              this.sqlDbType.equals(other.getSqlDbType()))) &&
            ((this.sqlValue==null && other.getSqlValue()==null) || 
             (this.sqlValue!=null &&
              this.sqlValue.equals(other.getSqlValue()))) &&
            ((this.udtTypeName==null && other.getUdtTypeName()==null) || 
             (this.udtTypeName!=null &&
              this.udtTypeName.equals(other.getUdtTypeName()))) &&
            ((this.typeName==null && other.getTypeName()==null) || 
             (this.typeName!=null &&
              this.typeName.equals(other.getTypeName()))) &&
            this.offset == other.getOffset();
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = super.hashCode();
        if (getCompareInfo() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getCompareInfo());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getCompareInfo(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getXmlSchemaCollectionDatabase() != null) {
            _hashCode += getXmlSchemaCollectionDatabase().hashCode();
        }
        if (getXmlSchemaCollectionOwningSchema() != null) {
            _hashCode += getXmlSchemaCollectionOwningSchema().hashCode();
        }
        if (getXmlSchemaCollectionName() != null) {
            _hashCode += getXmlSchemaCollectionName().hashCode();
        }
        if (getForceColumnEncryption() != null) {
            _hashCode += getForceColumnEncryption().hashCode();
        }
        _hashCode += getLocaleId();
        if (getSqlDbType() != null) {
            _hashCode += getSqlDbType().hashCode();
        }
        if (getSqlValue() != null) {
            _hashCode += getSqlValue().hashCode();
        }
        if (getUdtTypeName() != null) {
            _hashCode += getUdtTypeName().hashCode();
        }
        if (getTypeName() != null) {
            _hashCode += getTypeName().hashCode();
        }
        _hashCode += getOffset();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(SqlParameter.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SqlParameter"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("compareInfo");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "CompareInfo"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SqlCompareOptions"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("xmlSchemaCollectionDatabase");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "XmlSchemaCollectionDatabase"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("xmlSchemaCollectionOwningSchema");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "XmlSchemaCollectionOwningSchema"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("xmlSchemaCollectionName");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "XmlSchemaCollectionName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("forceColumnEncryption");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "ForceColumnEncryption"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("localeId");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "LocaleId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sqlDbType");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SqlDbType"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SqlDbType"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("sqlValue");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "SqlValue"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "anyType"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("udtTypeName");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "UdtTypeName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("typeName");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "TypeName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("offset");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fdnet.dhammakaya.network/", "Offset"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
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
