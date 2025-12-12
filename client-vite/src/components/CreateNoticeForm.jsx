import useCreateNoticeForm from '../hooks/useCreateNoticeForm';
import SuccessModal from './SuccessModal';
import TargetSelector from './create-notice-form/TargetSelector';
import EmployeeInputs from './create-notice-form/EmployeeInputs';
import NoticeContentFields from './create-notice-form/NoticeContentFields';
import NoticeMetaFields from './create-notice-form/NoticeMetaFields';
import FormAttachments from './create-notice-form/FormAttachments';
import FormActions from './create-notice-form/FormActions';

export default function CreateNoticeForm() {
    const {
        targetType,
        setTargetType,
        selectedDepartment,
        setSelectedDepartment,
        formData,
        handleChange,
        handleFileChange,
        removeAttachment,
        submitForm,
        showSuccess,
        resetForm,
        errors,
        attachment,
        fileInputRef,
        isSubmitting
    } = useCreateNoticeForm();

    const departmentOptions = [
        "All Department", "Finance", "Sales Team", "Web Team", "Database Team", "Admin", "HR"
    ];

    const positionOptions = [
        "Software Engineer", "Senior Software Engineer", "Team Lead", "Project Manager", "HR Manager",
        "Sales Executive", "Data Analyst", "System Administrator", "Content Writer", "Designer"
    ];

    return (
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-4">Please fill in the details below</h2>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); submitForm('Published'); }}>

                {/* 1. Target Audience */}
                <TargetSelector
                    targetType={targetType}
                    setTargetType={setTargetType}
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                    departmentOptions={departmentOptions}
                />

                {/* 2. Employee Details (Conditional) */}
                {targetType === 'Individual' && (
                    <EmployeeInputs
                        formData={formData}
                        handleChange={handleChange}
                        errors={errors}
                        positionOptions={positionOptions}
                    />
                )}

                {/* 3. Title & Body */}
                <NoticeContentFields
                    formData={formData}
                    handleChange={handleChange}
                    errors={errors}
                />

                {/* 4. Type & Date */}
                <NoticeMetaFields
                    formData={formData}
                    handleChange={handleChange}
                    errors={errors}
                />

                {/* 5. Attachments */}
                <FormAttachments
                    attachment={attachment}
                    handleFileChange={handleFileChange}
                    removeAttachment={removeAttachment}
                    fileInputRef={fileInputRef}
                />

                {/* 6. Buttons */}
                <FormActions
                    onSaveDraft={() => submitForm('Draft')}
                    onSubmit={() => submitForm('Published')}
                    isSubmitting={isSubmitting}
                />
            </form>

            {showSuccess && formData && <SuccessModal title={formData.title} date={formData.publishDate} onClose={resetForm} />}
        </div>
    );
}
